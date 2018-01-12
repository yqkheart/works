    function Game () {
        this.arr = [
            {value : 'A',src : 'A.png'},
            {value : 'B',src : 'B.png'},
            {value : 'C',src : 'C.png'},
            {value : 'D',src : 'D.png'},
            {value : 'E',src : 'E.png'},
            {value : 'F',src : 'F.png'},
            {value : 'G',src : 'G.png'},
            {value : 'H',src : 'H.png'},
            {value : "I",src : "I.png"},
            {value : "J",src : "J.png"},
            {value : "K",src : "K.png"},
            {value : "L",src : "L.png"},
            {value : "M",src : "M.png"},
            {value : "N",src : "N.png"},
            {value : "O",src : "O.png"},
            {value : "P",src : "P.png"},
            {value : "Q",src : "Q.png"},
            {value : "R",src : "R.png"},
            {value : "S",src : "S.png"},
            {value : "T",src : "T.png"},
            {value : "U",src : "U.png"},
            {value : "V",src : "V.png"},
            {value : "W",src : "W.png"},
            {value : "X",src : "X.png"},
            {value : "Y",src : "Y.png"},
            {value : "Z",src : "Z.png"}
        ];
        this.num = 3;
        this.currentArr = [];
        this.currentDom = [];
        this.box = $('#box');
        this.width = box.offsetWidth-53;
        this.height = box.offsetHeight-77;
        this.time = 120;
        this.speed = 2;
        this.t = '';
        this.life = 10;
        this.score = 0;
        this.pass = 20;
        this.qwe = 1;
        this.stop = true;
        this.go = $('.go');
    }

    Game.prototype = {
        play: function () {
            this.getChar();
            this.Draw();
            this.Move();
            this.Down();
            this.onKeyup();
            this.stops();
        },
        getChar: function () {
            while (this.currentArr.length < this.num) {
                //console.log(this.currentArr.length);
                var ran = Math.floor(Math.random() * this.arr.length);
                //console.log(ran);
                var newa = this.arr[ran];
                //console.log(newa);
                if (!(this.Check(newa))) {
                    this.currentArr.push(newa);
                }
            }
            //console.log(this.currentArr);
        },
        getOneArr: function () {
            do {
                var ran = Math.floor(Math.random() * this.arr.length);
                var newa = this.arr[ran];
            } while (this.Check(newa));
            this.currentArr.push(newa);

            var img = $('<img>',{src : `A_Z/${newa.src}`});
            var lefts = Math.random() * this.width;
            var tops = Math.random() * 50;
            img.css({left:lefts,top:tops});
            this.box.append(img);
            this.currentDom.push(img);
        },
        Check: function (obj) {
            var aa = this.currentArr.some(function (val) {
                return val.value == obj.value;
            });
            return aa;
        },
        Draw: function () {
            var self = this;
            self.currentArr.forEach(function (obj) {
                var img = $('<img>',{src : `A_Z/${obj.src}`});
                var lefts = Math.random() * self.width;
                var tops = Math.random() * 50;
                img.css({left:lefts,top:tops});
                self.box.append(img);
                self.currentDom.push(img);
                console.log(img);
            })
        },
        Move: function () {
            var self = this;
            self.t = setInterval(function () {
                if (self.stop) {
                    for (var i = 0; i < self.currentDom.length; i++) {
                        var tops = self.currentDom[i].offset().top;
                        var newtop = tops + self.speed;
                        if (newtop >= self.height) {
                            self.box.find(self.currentDom[i]).remove();
                            self.currentArr.splice(i, 1);
                            self.currentDom.splice(i, 1);
                            self.life--;
                            $('#life').html(self.life);
                            self.getOneArr();
                            if (self.life <= 0) {
                                var flag = confirm('胜败乃兵家常事 少侠请重新来过');
                                if (flag) {
                                    location.reload();
                                }else {
                                    close();
                                }
                            }
                        } else {
                            self.currentDom[i].css({top:newtop});
                        }
                    }
                }
            }, self.time);
        },
        Down: function () {
            var self = this;
            document.onkeydown = function (e) {
                var code = e.keyCode;
                var realkey = String.fromCharCode(code);
                //console.log(realkey);
                var index = self.currentArr.findIndex(function (aa) {
                    return aa.value == realkey;
                })
                if (index > -1) {
                    self.box.find(self.currentDom[index]).remove();
                    self.currentArr.splice(index,1);
                    self.currentDom.splice(index,1);
                    self.score++;
                    document.querySelector('#score').innerHTML = self.score;
                    self.getOneArr();
                    if (self.score == self.pass) {
                        document.querySelector('#pass').innerHTML = self.qwe + 1;
                        self.Nextgame();
                        return;
                    }
                }
                //console.log(index);
            }
        },
        Nextgame : function () {
            clearInterval(this.t);

            for(var i = 0;i < this.currentArr.length;i++){
                console.log(this.currentArr[i]);
                this.box.find(this.currentDom[i]).remove();
            }
            this.currentArr=[];
            this.currentDom=[];
            this.speed+=1;
            this.num+=1;
            this.pass+=20;
            this.qwe+=1;
            this.getChar();
            this.Draw();
            this.Move();
        },
        onKeyup:function () {
            var that=this;
            document.onkeyup=function (e) {
                var col=e.keyCode;
                if (col==32){
                    that.stop=!that.stop
                }
            }
        },
        stops:function(){
            let ting=document.getElementsByClassName("ting");
            console.log(ting)
            var that=this;
            var fun1=function(){

            }
            // if (ting.addEventListener("click", fun1)) {
            //     console.log(1)
            // }
        },
        Go : function () {
            this.Move();
        },
        //Restart : function () {
        //    clearInterval(this.t);
        //    for(var i = 0;i < this.currentArr.length;i++){
        //        console.log(this.currentArr[i]);
        //        this.box.find(this.currentDom[i]).remove();
        //    }
        //    this.num = 3;
        //    this.currentArr = [];
        //    this.currentDom = [];
        //    this.box = $('#box');
        //    this.width = box.offsetWidth-53;
        //    this.height = box.offsetHeight-77;
        //    this.time = 120;
        //    this.speed = 2;
        //    this.t = '';
        //    this.life = 10;
        //    this.score = 0;
        //    this.pass = 20;
        //    this.qwe = 1;
        //    this.play();
        //}
    }




