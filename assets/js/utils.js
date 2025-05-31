import { URL_API_LOGIN } from "./const.js";
export async function request_api({url,json}){
    let req = await fetch(url,{
        method:"POST",
        headers: {"Content-type": "application/json;"},
        body: JSON.stringify(json)
    });
    let res = await req.text();
    // console.log(res);
    let data = JSON.parse(res);
    
    // if(url != URL_API_LOGIN && typeof data.login !== 'undefined' && data.login === false){
    //     alert_msg({
    //         msg:'sesion expirada'
    //     });
    //     location.reload();
    // }

    return data;
}

export async function request_file({url,file,token,id}){
    let formData = new FormData();

    formData.append("file", file);
    formData.append("action", 'files');
    formData.append("token", token);
    formData.append("page", id);

    let req = await fetch(`${url}`,{
        method: "POST", 
        body: formData
    });
    let res = await req.text();
    let json = JSON.parse(res);

    if(typeof json.login !== 'undefined' && json.login === false){
        alert_msg({
            msg:'sesion expirada'
        });
        location.reload();
    }
    
    return json;
}

export function alert_msg({msg,type,fun}){
    let type_alert = {
        'confirm':function(){
        },
        'message':function(){
        }
    };
    alert(msg);
}

export function back_home(){
    window.location.href = "../";
}

export async function get_foreign_data({url,json,id,column}){
    let data = await request_api({url:url,json:json});
    let res = data.map(d=>{
        // console.log(json)
        return {
            id:d[id],
            name:d[column]
        };
    });
    return res;
}