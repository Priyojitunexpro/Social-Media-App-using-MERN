import React, { useState, useEffect } from 'react'//in this window we are creating new post
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'//we are also taking inputs from user history
import '../../App.css'
const CreatePost = () => {//create post function definition
    const history = useHistory()
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(() => {
        if (url) {
            fetch("/createPost", {//the fetch file to store object related to create post
                method: "post",
                headers: {
                    "Content-Type": "application/json",//here the content type is application.json
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({//we are stringify ing json object
                    body,//here we are storing the body of the post
                    pic: url////here we are storing the image associated with the post
                })
            }).then(res => res.json())
                .then(data => {

                    if (data.error) {
                        M.toast({ html: data.error, classes: "#c62828 red darken-3" })//exception condition
                    }
                    else {
                        M.toast({ html: "Created post Successfully", classes: "#43a047 green darken-1" })//else condition checking
                        history.push('/')
                    }
                }).catch(err => {
                    console.log(err)//printing the undesired error in console
                })
        }
    }, [url])
    const postDetails = () => {
        const data = new FormData()
        const unsignedUploadPreset = "insta-clone" // fictional preset name here
        data.append("file", image)
        data.append("upload_preset", unsignedUploadPreset)
        data.append("cloud_name", "dnvtlgaf6")
        //
        fetch("https://api.cloudinary.com/v1_1/dnvtlgaf6/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="card okk input-field"
        >
            <textarea className="textarea card"
                cols="30" rows="5"
                type="text"
                placeholder="Write a caption"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => {
                        var file = e.target.files[0];
                        var t = file.type.split('/').pop().toLowerCase();
                        if (t != "jpeg" && t != "jpg" && t != "png") {
                            M.toast({ html: "Image Format is invalid", classes: "#c62828 red darken-3" })
                            return;
                        }
                        setImage(e.target.files[0])
                    }} />


                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="jpg/jpeg/png" />
                </div>
            </div>
            <button className="btn #64b5f6 blue darken-1"
                onClick={() => postDetails()}
            >
                Post Image
            </button>

        </div>
    )
}

export default CreatePost
