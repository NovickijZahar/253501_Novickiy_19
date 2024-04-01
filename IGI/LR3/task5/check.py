def check_input(type, statement=lambda x: True, error_message='Unknown error', info=''):
    '''
    Checks the correctness of the comverted data with statement 
    
    type
        type to convert in
    statement
        statement to check 
    error_message
        message to display if the data is not correct 
    info
        message to output before input
    '''
    while True:
        try:
            number = type(input(info))
            if not statement(number):
                raise Exception(error_message)
            break
        except Exception as e:
            print(f'Error. {e}')
    return number
