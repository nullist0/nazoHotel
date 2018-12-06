import purify from "purify-css"

const purify = require("purify-css")

let content = "home.html"
let css = "css/style.css"
let options = {
    output: "filepath/output.css"
}
purify(content, css, options)