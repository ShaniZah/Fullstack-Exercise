import{a as q,e as G,f as J}from"./chunk-HXBQ5UI5.js";import{e as D,f as W}from"./chunk-MDSJCAGU.js";import"./chunk-VKM7CXHH.js";import{d as j,g as N,k as V,l as k,m as B}from"./chunk-NO66PUKX.js";import{C as A,D as z}from"./chunk-JVMS6NBD.js";import{Ab as y,Cb as H,Db as F,Ea as r,Eb as L,Ja as b,Pa as x,T as v,Ta as m,Y as C,Za as d,Zb as P,ac as E,cb as M,da as h,ea as u,fb as a,gb as s,gc as I,ib as R,jb as O,kc as T,lb as S,nb as f,ob as l,yb as p,zb as w}from"./chunk-M4PHA4DX.js";var g=class o{constructor(e){this.http=e}getHealthReasons(){return this.http.get("assets/health_reasons.json")}submitReport(){return this.http.post(T.sendReport,{})}static \u0275fac=function(t){return new(t||o)(C(I))};static \u0275prov=v({token:o,factory:o.\u0275fac,providedIn:"root"})};function X(o,e){if(o&1&&(a(0,"mat-option",7),p(1),s()),o&2){let t=e.$implicit;d("value",t),r(),y(" ",t.name," ")}}function Y(o,e){if(o&1){let t=S();R(0),a(1,"mat-form-field",4)(2,"mat-select",5),L("ngModelChange",function(i){let c=h(t).index,_=l();return F(_.selectedLevels[c],i)||(_.selectedLevels[c]=i),u(i)}),f("selectionChange",function(){let i=h(t).index,c=l();return u(c.onLevelChange(i))}),m(3,X,2,2,"mat-option",6),s()(),O()}if(o&2){let t=e.$implicit,n=e.index,i=l();r(2),H("ngModel",i.selectedLevels[n]),r(),d("ngForOf",t)}}function Z(o,e){if(o&1&&(a(0,"p"),p(1),s()),o&2){let t=l();r(),w(t.message)}}var K=class o{constructor(e){this.reportService=e}data=[];selectedLevels=[null];levelOptions=[[]];message="";submitting=!1;ngOnInit(){this.reportService.getHealthReasons().subscribe({next:e=>{this.data=e.values,this.levelOptions[0]=this.data},error:e=>{console.error("Failed to load health_reasons.json:",e)}})}onLevelChange(e){let t=this.selectedLevels[e];this.selectedLevels=this.selectedLevels.slice(0,e+1),this.levelOptions=this.levelOptions.slice(0,e+1),t?.values?.length&&(this.selectedLevels.push(null),this.levelOptions.push(t.values))}submitReport(){for(let e=0;e<this.selectedLevels.length;e++){let t=this.selectedLevels[e],n=!!t?.values?.length;if(!t||n&&!this.selectedLevels[e+1]){this.message="Please complete all dropdowns.";return}}this.submitting=!0,this.message="Sending...",this.reportService.submitReport().subscribe({next:e=>{this.submitting=!1,this.message=e.message},error:e=>{console.error("Error submitting report:",e),this.submitting=!1,this.message="An error occurred while sending your report."}})}static \u0275fac=function(t){return new(t||o)(b(g))};static \u0275cmp=x({type:o,selectors:[["app-report"]],decls:7,vars:2,consts:[[1,"report-card"],[1,"report-header"],[4,"ngFor","ngForOf"],["mat-raised-button","","color","accent",3,"click"],["appearance","outline",1,"full-width","light-bg"],["placeholder","choose option",3,"ngModelChange","selectionChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(t,n){t&1&&(a(0,"mat-card",0)(1,"h2",1),p(2,"Report Health Issue"),s(),m(3,Y,4,2,"ng-container",2),a(4,"button",3),f("click",function(){return n.submitReport()}),p(5," Submit "),s(),m(6,Z,2,1,"p"),s()),t&2&&(r(3),d("ngForOf",n.levelOptions),r(3),M(n.message?6:-1))},dependencies:[E,P,V,j,N,B,k,W,D,J,G,q,z,A],styles:[".report-card[_ngcontent-%COMP%]{border-radius:16px;padding:24px;margin:40px auto;max-width:500px;box-shadow:0 4px 16px #0000001a}.report-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:20px;font-size:24px;font-weight:500}.report-card[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%]{width:100%;margin-bottom:16px}.report-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:16px}.report-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:16px;font-style:italic;text-align:center;color:gray}.report-header[_ngcontent-%COMP%]{color:#2b2b2b}"]})};export{K as ReportComponent};
