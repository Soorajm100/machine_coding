import requests

def filter_movies(data , genre : str):
    res =[]
    for ele  in  data:
        if genre in  ele["genres"] : 
            res.append(ele)
    return  res 



def get_api(genre : str):
    res =[]
    for i  in range(1,2) : 
        response = requests.get(f"https://api.tvmaze.com/shows?page={i}")
        data = response.json()
        res.extend(filter_movies(data , genre))
    res.sort(key= lambda x : (-(x.get('rating' , {}).get('average') or 0), str(x.get('name')or '')))
    print(len(res))
    return [res[0]['name'] , res[0]['rating']['average']]




print(get_api("Comedy"))
