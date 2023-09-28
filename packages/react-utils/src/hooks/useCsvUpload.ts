import { ChangeEvent, useState } from 'react';

export const useCsvUpload = () => {
  const [file, setFile] = useState<File | null>();

  const fileReader = new FileReader();

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  const readCsv = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file) {
        fileReader.onload = function (event: any) {
          const text = event.target.result;

          resolve(text);
        };

        fileReader.readAsText(file);
      } else {
        reject('No file');
      }
    });
  };

  return {
    onFileChange,
    readCsv,
  };
};
