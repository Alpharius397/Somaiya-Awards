package main

import (
	"bufio"
	"errors"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"sync"
)

const (
	Reset  = "\033[0m"
	Red    = "\033[31m"
	Green  = "\033[32m"
	Yellow = "\033[33m"
	Blue   = "\033[34m"
	Purple = "\033[35m"
	Cyan   = "\033[36m"
)

var wg sync.WaitGroup

const ReadMeRegex = `!\[(?P<name>([[:alnum:]\s]+))\]\((?P<url>([[:graph:]]+))\)`

type ReadMeIcon struct {
	name string
	url  string
}

func baseRequest(url string) (*http.Response, error) {
	request, err := http.NewRequest("GET", url, nil)

	resp, err := http.DefaultClient.Do(request)

	if err != nil {
		return nil, err
	}

	return resp, nil
}

func writeBody(filePath string, resp *http.Response) error {
	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	file, err := os.OpenFile(filePath, os.O_CREATE|os.O_WRONLY, 0644)

	if err != nil {
		return err
	}

	defer file.Close()

	_, err = file.Write(body)

	return err
}

func getFile(icon ReadMeIcon, outputDir string) {

	name := icon.name
	url := icon.url

	path := fmt.Sprintf("%s/%s.svg", outputDir, name)

	_, err := os.Open(path)

	if err == nil {
		fmt.Printf("%s File: %s already exists. Skipping%s\n", Purple, path, Reset)
		return
	}

	fmt.Printf("%s Fetching File: %s, with URL: %s%s\n", Yellow, name, url, Reset)
	resp, err := baseRequest(url)

	if err != nil {
		fmt.Printf("%s Fetching Failed for File: %s\n", Red, name)
		fmt.Printf(" -------ERROR-------\n    %v\n -------END-------\n%s", err, Reset)
		return
	}

	fmt.Printf("%s Writing to File: %s\n%s", Blue, name, Reset)

	err = writeBody(path, resp)

	if err != nil {
		fmt.Printf("%s Write Failed for File: %s\n", Red, name)
		fmt.Printf(" -------ERROR-------\n    %v\n -------END-------\n%s", err, Reset)
	} else {
		fmt.Printf("%s Done Writing to File: %s\n%s", Green, name, Reset)
	}
}

func networkWorker(data <-chan ReadMeIcon, outputDir string) {
	for d := range data {
		getFile(d, outputDir)
		wg.Done()
	}
}

func textWorker(lines <-chan string, data chan ReadMeIcon, re *regexp.Regexp) {
	for line := range lines {

		matches := re.FindAllStringSubmatch(line, -1)

		for _, value := range matches {

			wg.Add(1)
			data <- ReadMeIcon{name: value[re.SubexpIndex("name")], url: value[re.SubexpIndex("url")]}

		}
	}
}

func main() {
	regex := regexp.MustCompile(ReadMeRegex)

	fs := flag.NewFlagSet("Readme Svg Downloader", flag.ContinueOnError)
	fs.SetOutput(os.Stdout)

	input := fs.String("input", "README.md", "`INPUT` Path to input readme.md file")
	output := fs.String("output", "saved", "`OUTPUT` Output Path of extracted images ")
	err := fs.Parse(os.Args[1:])

	if err != nil {
		if !errors.Is(err, flag.ErrHelp) {
			log.Fatalf("Parsing Error: %s", err)
		}
		return
	}

	file, err := os.Open(*input)

	if err != nil {
		panic(err)
	}

	defer file.Close()

	err = os.MkdirAll(*output, 0766)

	if err != nil {
		panic(err)
	}

	strChan := make(chan string, 64)
	urlChan := make(chan ReadMeIcon, 64)

	// Start worker pool
	for range 8 {
		go textWorker(strChan, urlChan, regex)
	}

	for range 8 {
		go networkWorker(urlChan, *output)
	}

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		strChan <- scanner.Text()
	}

	close(strChan)
	wg.Wait()
	close(urlChan)

	fmt.Printf("\n%s All tasks completed!%s\n%s", Green, Green, Reset)
}
