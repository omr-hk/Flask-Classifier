export default class APIService{
    // Insert an article
    static InsertArticle(body: any){
        return fetch('http://127.0.0.1:5000/predict',{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

}