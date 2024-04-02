from func import repetition, find_vowels, sort_alphabet_order

line = 'So she was considering in her own mind, as well as she could, \
for the hot day made, her feel very sleepy and stupid, whether \
the pleasure of making a daisy-chain would be worth the trouble \
of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.'


if __name__ == '__main__':
    print(f'Number of words starting or ending to a vowel: {find_vowels(line)}')
    print('Number of repetitions of each character:')
    for k, v in repetition(line).items():
        if k == ' ':
            k = 'space'
        print(f'{k} - {v}')
    print('Words after commas in alphabetical order:')
    print(*sort_alphabet_order(line), sep='\n')


