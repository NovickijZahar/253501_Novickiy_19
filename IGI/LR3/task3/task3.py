from task4.func import ispunctuation, isspace

res = {}

for c in input('Enter the line\n'):
    if c.isdigit() or ispunctuation(c) or isspace(c):
        res[c] = res.setdefault(c, 0) + 1

for k, v in res.items():
    if k == ' ':
        k = 'space'
    print(f'{k} - {v}')
