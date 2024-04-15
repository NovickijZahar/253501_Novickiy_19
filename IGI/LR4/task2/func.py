import re
from zipfile import ZipFile

class Func:
    @staticmethod
    def count_sentences(text):
        return text.count('.') + text.count('!') + text.count('?')

    @staticmethod
    def count_declaratives(text):
        return text.count('.')

    @staticmethod
    def count_interrogatives(text):
        return text.count('?')

    @staticmethod
    def count_exclamatories(text):
        return text.count('!')

    @staticmethod
    def average_sentence_length(text):
        res = 0
        new_text = list(map(lambda x: x.strip(), re.split('[!.?]', text)))[:-1]
        for line in new_text:
            res += len(line.split())
        return res / len(new_text)

    @staticmethod
    def average_word_length(text):
        res = 0
        count = 0
        new_text = list(map(lambda x: x.strip(), re.split('[!.?]', text)))[:-1]
        for line in new_text:
            res += sum(map(lambda w: len(w), map(lambda w: w.strip(',:")(][!.?- '),line.split())))
            count += len(line.split())
        return res / count

    @staticmethod
    def count_smiley(text):
        regex = r'[;:]-*\)+|[;:]-*\(+|[;:]-*\[+|[;:]-*\]+'
        return len(re.findall(regex, text))

    @staticmethod
    def get_all_specific_sentences(text):
        '''get sentences with spaces, numbers and punctuation marks'''
        regex = r'[^\.!?]+[\.!?]'
        res = []
        for line in re.findall(regex, text):
            if re.search(r'\d+', line) and re.search(r'[a-zA-Z]', line) and re.search(r'\s+', line):
                res.append(line.strip())
        return res

    @staticmethod
    def get_all_sentences(text):
        regex = r'[^\.!?]+[\.!?]'
        res = []
        for line in re.findall(regex, text):
            res.append(line.strip())
        return res

    @staticmethod
    def is_correct_date(line):
        '''check does line have the correct date'''
        regex = r'(?:[1-9]|0[1-9]|1[0-9]|2[0-9]|3[01])\/(?:[1-9]|1[0-2]|0[1-9])\/(?:[2-9]\d\d\d|1[6-9]\d\d)'
        if re.search(regex, line):
            return True
        return False

    @staticmethod
    def count_upper_case(line):
        '''count uppercase symbols in line'''
        regex = r'[A-Z]'
        return len(re.findall(regex, line))

    @staticmethod
    def get_first_word_with_z(line):
        regex = r'\b\w*z\w*\b'
        if re.findall(regex, line):
            word = re.findall(regex, line)[0].strip(',:")(][!.?- ')
            return word.strip(',:")(][!.?-'), list(map(lambda w: w.strip(',:")(][!.?- '), line.split())).index(word) + 1

    @staticmethod
    def line_without_a(line):
        regex = r'\b[a]\w+\b'
        words = re.findall(regex, line)
        for word in words:
            line = line.replace(word, '')
        while line.find('  ') != -1:
            line = line.replace('  ', ' ')
        return line

    @staticmethod
    def analyze():
        with open('igi/lr4/task2/input.txt') as input, open('igi/lr4/task2/output.txt', 'w') as output:
            text = input.read()
            output.write(f'Number of sentences: {Func.count_sentences(text)}\n')
            output.write(f'Numer of declarative sentences: {Func.count_declaratives(text)}\n')
            output.write(f'Number of interogative sentences: {Func.count_interrogatives(text)}\n')
            output.write(f'Number of exclamatory sentences: {Func.count_interrogatives(text)}\n')
            output.write(f'Average sentence length: {Func.average_sentence_length(text):0.2f}\n')
            output.write(f'Average word length: {Func.average_word_length(text):0.2f}\n')
            output.write(f'Number of correct smileys: {Func.count_smiley(text)}\n')
            output.write(f'Number of uppercase letters: {sum(map(lambda x: Func.count_upper_case(x), Func.get_all_sentences(text)))}\n')
            output.write('\nAll sentences:\n')
            output.write('\n'.join(Func.get_all_sentences(text)))
            output.write('\n\nAll sentences with spaces, numbers and punctuation marks:\n')
            for line in Func.get_all_specific_sentences(text):
                output.write(f'{line}\tdata is correct = {Func.is_correct_date(line)}\n')
            output.write(f'\n\nFirst words in sentences with letter z:\n')
            for line in Func.get_all_sentences(text):
                if Func.get_first_word_with_z(line) != None:
                    output.write(f'word = {Func.get_first_word_with_z(line)[0]}, position = {Func.get_first_word_with_z(line)[1]}\n')
        with ZipFile('igi/lr4/task2/zipfile.zip', 'a') as myzip:
            myzip.write('igi/lr4/task2/output.txt')

    @staticmethod
    def get_info_from_archive():
        with ZipFile('igi/lr4/task2/zipfile.zip', 'r') as myzip:
            content = myzip.read('igi/lr4/task2/output.txt').decode('utf-8')
            print(content)