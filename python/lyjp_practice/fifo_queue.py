def help():
    print("Available commands:")
    print("  push - Add an integer to the queue")
    print("  pop - Remove and return the first integer from the queue")
    print("  exit - Exit the program")
    print("  help - Show this help message")

def pop(queue):
    if not queue or len(queue) == 0:
        print("Queue is empty. Cannot pop.")
    else:
        item = queue.pop(0)
        print(f"Queue: {queue}")
        return item

def push(queue, item):
    queue.append(item)
    print(f"Queue: {queue}")

def main():
    print("This is a FIFO queue implementation. Type 'exit' to quit, or 'help' for commands.")    
    queue = []
    while True:
        command = input("Enter command: ").strip().lower()
        if command == "help":
            help()
        elif command == "push":
            item = input("  > Enter an integer to push: ")
            item = int(item)
            push(queue, item)
        elif command == "pop":
            pop(queue)
        elif command == "exit":
            print("Exiting the FIFO queue program.")
            break
        else:
            print("Unknown command. Type 'help' for a list of commands.")
            print(f"Queue: {queue}")


if __name__ == "__main__":
    main()
