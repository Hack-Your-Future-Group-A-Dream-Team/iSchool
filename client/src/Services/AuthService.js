
export default {
    login : user =>{
        return fetch('/user/login',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            console.log(res);
            if(res.status !== 401)
                return res.json().then(data => data);
            else {
                console.log(res);
                return { isAuthenticated : false, user : {email : "",role : "", _id:''}}
            }
                
        })
    },

    logout : ()=>{
        return fetch('/user/logout')
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    return data;
                });
    },
    isAuthenticated : ()=>{
        return fetch('/user/authenticated')
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data => {
                            return data
                        });
                    else
                        return { isAuthenticated : false, user : {email : "",role : "", _id: ""}};
                });
    }

}