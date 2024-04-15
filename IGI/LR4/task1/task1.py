from mycsv import write_in_csv, read_from_csv
from mypickle import write_in_pickle, read_from_pickle


if __name__ == '__main__':
    filename1 = 'igi/lr4/task1/file1.csv'
    filename2 = 'igi/lr4/task1/file2.txt'
    write_in_csv(filename1)
    print(read_from_csv(filename1))
    write_in_pickle(filename2)
    print(read_from_pickle(filename2))