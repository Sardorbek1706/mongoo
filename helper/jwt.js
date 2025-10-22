import jwt from "jsonwebtoken"
const secretKey = "qwer12345"
const payload = {
    id: 12,
  name: "Umar",
    role: "teacher",
    staffid: 212345
}
const expriseIN = {expriseIN: '2s'}
const token = jwt.sign(payload, secretKey,expriseIN)
console.log({token})
function checkToken(token) {
    var decoded = jwt.verify(token,secretKey)
    console.log({decoded})
}

setTimeout(() => {
    checkToken(token)
}, 5000)