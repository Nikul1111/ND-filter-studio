const upload=document.getElementById('imageUpload');
const canvas=document.getElementById('mainCanvas');
const ctx=canvas.getContext('2d');
const gallery=document.getElementById('filterGallery');
const download=document.getElementById('downloadBtn');
let originalImage=null;

upload.onchange=e=>{
const file=e.target.files[0];
if(!file)return;
const r=new FileReader();
r.onload=ev=>{
const img=new Image();
img.onload=()=>{
originalImage=img;
canvas.width=img.width;
canvas.height=img.height;
ctx.drawImage(img,0,0);
generate();
};
img.src=ev.target.result;
};
r.readAsDataURL(file);
};

download.onclick=()=>{
const a=document.createElement('a');
a.download='filtered.png';
a.href=canvas.toDataURL();
a.click();
};

function generate(){
gallery.innerHTML='';
[['Original','none'],
['Bright','brightness(120%)'],
['Contrast','contrast(150%)'],
['Vintage','sepia(80%)'],
['B&W','grayscale(100%)']
].forEach(f=>card(f[0],f[1]));
}

function card(name,filter){
const d=document.createElement('div');
d.className='filterCard';
const c=document.createElement('canvas');
c.width=180;
c.height=180;
const x=c.getContext('2d');
x.filter=filter;
x.drawImage(originalImage,0,0,c.width,c.height);
const t=document.createElement('div');
t.className='filterName';
t.textContent=name;
d.append(c,t);

d.onclick=()=>{
ctx.filter=filter;
ctx.drawImage(originalImage,0,0);
ctx.filter='none';
};

gallery.appendChild(d);
  }
