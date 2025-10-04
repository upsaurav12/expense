run:
	go run ./cmd/main.go

build:
	go build -o bin/server ./cmd/server/main.go

lint:
	golangci-lint run ./...

test:
	go test ./...
