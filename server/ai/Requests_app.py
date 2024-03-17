import requests
import json

# level: 1 easy
# level: 3 medium
# level: 4> hard
# level: 100> hard

BASE = "http://127.0.0.1:5000/"

response = requests.post(BASE + "Offline/Start", headers={'Content-Type': 'application/json'}, data=json.dumps({'level': 0.1, 'index': 0}))
res = response.json()
print(res['message'])

while res['end'] == False:
    if response.status_code == 200:
        print(res['board'], '\n', res['index'], '\n')
    else:
        print(res['message'])
    
    print(' Enter you desired move [1->9] or exit to quit\n----------------------------------------------')
    inp = input('>> ')
    if inp == '':
        continue
    elif inp == 'exit':
        break
    
    try:
        inp = int(inp)
    except Exception as e:
        continue
    response = requests.put(BASE + "Offline/Start", headers={'Content-Type': 'application/json'}, data=json.dumps({'level': 4, 'index': ((inp-1) if inp!=0 else 9)}))
    res = response.json()

    if res['end'] == True:
        if res['win'] == True:
            print("\nYou win!")
        elif res['draw'] == True:
            print("\nDraw!")
        else:
            print("\nYou've lost!")
        
        print(res['board'], '\n', res['index'])
        break