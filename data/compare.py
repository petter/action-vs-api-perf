import pandas as pd
import matplotlib.pyplot as plt
import argparse

def load_csv(file_path):
    """Load CSV file into a DataFrame."""
    return pd.read_csv(file_path)

def plot_comparison(file1, file2, field="response-time", output=None):
    """Plot comparison graph for a given field between two CSV files."""
    # Load data
    data1 = load_csv(file1)
    data2 = load_csv(file2)
    
    if field not in data1.columns or field not in data2.columns:
        print(f"Error: Field '{field}' not found in one or both CSV files.")
        return
    
    # Plot data
    plt.figure(figsize=(10, 6))
    plt.plot(data1.index, data1[field], label=f"{file1} - {field}", marker="o")
    plt.plot(data2.index, data2[field], label=f"{file2} - {field}", marker="s")
    
    plt.xlabel("Request Index")
    plt.ylabel("Time (seconds)")
    plt.title(f"Comparison of {field} between two datasets")
    plt.legend()
    plt.grid(True)
    plt.ylim(bottom=0)  # Set y-axis to start at 0
    
    if output:
        plt.savefig(output)
        plt.close()
    else:
        plt.show()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compare a field between two CSV benchmark files.")
    parser.add_argument("file1", type=str, help="Path to first CSV file")
    parser.add_argument("file2", type=str, help="Path to second CSV file")
    parser.add_argument("--field", type=str, default="response-time", help="Field to compare (default: response-time)")
    parser.add_argument("--output", type=str, help="Path to save the output plot")
    
    args = parser.parse_args()
    plot_comparison(args.file1, args.file2, args.field, args.output)
