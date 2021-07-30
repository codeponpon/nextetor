import JSZip from "jszip";
import { saveAs } from "file-saver";
import { formatCode } from "./utils";

let publishJSON;

export function saveJsZip(
  callBack: (json: { file: string; data: string }) => void
) {
  publishJSON = {
    file: "pages/index.js",
    data: "import React, { useEffect } from 'react';\nimport { useRouter } from 'next/router';\nimport Head from 'next/head';\nconst Index = () => {\nconst router = useRouter();\nuseEffect(() => {return () => {if(router.pathname === '/') router.replace(`/g/${process.env.GAME_ID}`)}}, [router]);\nreturn (<div><Head><title>Game Client</title><meta name='description' content='Game Client' /></Head></div>);\n}\nexport default Index;\n",
  };
  callBack(publishJSON);
}

export function saveJSON(json: string, cb: () => void) {
  const zip = new JSZip();
  formatCode({
    code: json,
    parser: "json",
    cb: (v) => {
      zip.file("edit-data.json", v);
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "edit-data.json.zip");
        cb();
      });
    },
  });
}
