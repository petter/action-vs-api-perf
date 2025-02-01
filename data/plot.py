import pandas as pd
import matplotlib.pyplot as plt
import argparse

def load_csv(file_path):
    """Load CSV file into a DataFrame."""
    return pd.read_csv(file_path)

def plot_comparison(file, field="response-time", output=None):
    """Plot comparison graph for a given field between two CSV files."""
    # Load data
    data = load_csv(file)
    
    if field not in data.columns:
        print(f"Error: Field '{field}' not found in one or both CSV files.")
        return
    
    # Plot data
    plt.figure(figsize=(10, 6))
    plt.plot(data.index, data[field], label=f"{file} - {field}", marker="o")
    
    plt.xlabel("Request Index")
    plt.ylabel("Time (seconds)")
    plt.title(f"Comparison of {field} between two datasets")
    plt.legend()
    plt.grid(True)
    
    if output:
        plt.savefig(output)
        plt.close()
    else:
        plt.show()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compare a field between two CSV benchmark files.")
    parser.add_argument("file", type=str, help="Path to first CSV file")
    parser.add_argument("--field", type=str, default="response-time", help="Field to compare (default: response-time)")
    parser.add_argument("--output", type=str, help="Path to save the output plot")
    
    args = parser.parse_args()
    plot_comparison(args.file, args.field, args.output)
