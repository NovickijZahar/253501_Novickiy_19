from student import students, average_date
import csv

def write_in_csv(filename):
    '''write to csv file'''
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f, quoting=csv.QUOTE_ALL)
        writer.writerow(['Id', 'Name', 'Surname', 'Date of birth'])
        for name, value in students.items():
            writer.writerow([name, *value.convert()])
        writer.writerow(['', '', 'Average date of birth', average_date(students)])

def read_from_csv(filename):
    '''read from csv file'''
    res = {}
    with open(filename, 'r', newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            res[row[0]] = row[1:]
    return res