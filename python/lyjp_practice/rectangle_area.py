import argparse


def calculate_area(length, width):
    """Calculate the area of a rectangle."""
    if length <= 0 or width <= 0:
        raise ValueError("Length and width must be positive numbers.")
    return length * width

def main(length, width):
    area = calculate_area(length, width)
    print(f"The area of rectange is: {area} units")
    

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Calculate the area of a rectangle.')
    parser.add_argument('--length', type=float, required=True, help='the length of the rectangle')
    parser.add_argument('--width', type=float, required=True, help='the width of the rectangle')
    args = parser.parse_args()
    
    main(length=args.length, width=args.width)