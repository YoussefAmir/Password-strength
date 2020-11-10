import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnInit {
  pass: string;
  bar0: string;  
  bar1: string;  
  bar2: string;  
  bar3: string;  
  bar4: string; 
  dic = {
    '!':1,
    '@':2,
    '#':3,
    '$':4,
    '%':5,
    '^':6,
    '&':7,
    '*':8,
    '(':9,
    ')':10,
    '_':11,
    '+':12
  }
  colors = ['#F00', '#F90', '#0F0', '#FFF'];
  score_ :any;

  constructor() { 
  }

  ngOnInit(): void {
    this.pass = "";
  }

  removeDuplicateCharacters(string) {
    return string
      .split('')
      .filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      })
      .join('');
  }

  score(){
    let n, len, num, sc, ucr, lcr, nr, sl, sn,ss, score, low;
    score = 0;
    n = len = num = sc = 0;
    ucr = lcr = nr = 0;
    sl = sn = ss = 0;

    let str: string = this.pass;
    n = str.length;

    len = (str.match(/[A-Z]/g) || []).length;
    num = (str.match(/[0-9]/g) || []).length;
    low = (str.match(/[a-z]/g) || []).length;
    sc = n - (len + num + low);

    // console.log(n, len, num, sc);
    let strn = this.removeDuplicateCharacters(this.pass)
    // console.log(strn)
    for(let i=0; i<strn.length; i++){
      if(strn[i].match(/[A-Z]/)){
        let re = new RegExp(strn[i], 'g');

        ucr = ucr + ((str.match(re) || []).length - 1);
      }
      else if(strn[i].match(/[a-z]/)){
        let re = new RegExp(strn[i], 'g');

        lcr = lcr + ((str.match(re) || []).length - 1);
      }
      else if(strn[i].match(/[0-9]/)){
        let re = new RegExp(strn[i], 'g');

        nr = nr + ((str.match(re) || []).length - 1);
      }
    }

    // console.log("Upper: ", ucr);
    // console.log("Lower: ", lcr);
    // console.log("Number: ", nr);
    let strl = str.toLowerCase();
    // console.log(strl, str);
    for(let i=0; i<strl.length; i++){
        if(strl[i].match(/[a-z]/)){
          if((i+1) != strl.length){
            // console.log(str[i+1].toLowerCase().charCodeAt(0) - str[i].toLowerCase().charCodeAt(0))
            while(strl[i+1].charCodeAt(0) - strl[i].charCodeAt(0) == 1 ){
              sl++
              i++;
              if((i+1) == strl.length)
                break;
            }
            if(sl > 0)
              sl = sl - 1
          }
        }
      else if(str[i].match(/[0-9]/)){
          if((i+1) != str.length){
            // console.log(str[i+1].toLowerCase().charCodeAt(0) - str[i].toLowerCase().charCodeAt(0))
            while(str[i+1].charCodeAt(0) - str[i].charCodeAt(0) == 1 ){
              sn++
              i++;
              if((i+1) == str.length)
                break;
            }
            if(sn > 0)
              sn = sn - 1
          }
      }
      else{
        if((i+1) != str.length){
          // console.log(str[i+1].toLowerCase().charCodeAt(0) - str[i].toLowerCase().charCodeAt(0))
          while(this.dic[str[i+1]] - this.dic[str[i]] == 1 ){
            // console.log("he8")
            ss++
            i++;
            if((i+1) == str.length)
              break;
          }
          if(ss > 0)
            ss = ss - 1
        }
      }

    }

    // console.log("Seq Letters: ", sl);
    // console.log("Seq Numbers: ", sn);
    // console.log("Seq Symbols: ", ss);

    score = score + (n*4);
    score = score + Math.abs((len-n)*2);
    score = score + Math.abs((len-n)*2);

    score = score + (num*4);
    score = score + (sc*6);
    score = score + (n*2);
    score = score - (n);
    score = score - (n);
    score = score - (ucr*2);
    score = score - (lcr*2);
    score = score - (nr*2);
    score = score - (sl*3);
    score = score - (sn*3);
    score = score - (ss*3);



    this.score_ = score;
    console.log(score)

    this.getColor();
  }

  getColor() {  
      if (this.score_ >= 100) {  
        this.bar0 = this.bar1 = this.bar2 = this.bar3 = this.bar4 = this.colors[2];
      } else if (this.score_ >= 50) {  
        this.bar0 = this.bar1 = this.bar2 = this.colors[1];  
        this.bar3 = this.bar4 = this.colors[3]
      } else{  
        this.bar0 = this.colors[0]; 
        this.bar1 = this.bar2 = this.bar3 = this.bar4 = this.colors[3]

      }  
    } 

  togglePass() {
    var x = <HTMLInputElement>document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

}
