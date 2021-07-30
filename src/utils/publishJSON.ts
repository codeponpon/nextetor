export function publishJSON(
  callBack: (json: { file: string; data: string }) => void
) {
  const publishJSON = {
    file: "pages/index.js",
    data: "import React, { useEffect } from 'react';\nimport { useRouter } from 'next/router';\nimport Head from 'next/head';\nconst Index = () => {\nconst router = useRouter();\nuseEffect(() => {return () => {if(router.pathname === '/') router.replace(`/g/${process.env.GAME_ID}`)}}, [router]);\nreturn (<div><Head><title>Game Client</title><meta name='description' content='Game Client' /></Head></div>);\n}\nexport default Index;\n",
  };
  callBack(publishJSON);
}
