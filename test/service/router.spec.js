const superagent = require("supertest");
const app = require("./app");

function request() {
    return superagent(app.listen())
}

describe("Node接口测试", function () {
    it("test接口测试", function (done) {
        request()
        .get("/test")
        .expect(200)
        .expect("Content-Type",/json/)
        .end(function(err,res){
            if(err){
                done(err);
            }
            if(res.body.data == "Hello world"){
                done();
            }else{
                done(new Error("接口数据异常"))
            }
        })
    });
});