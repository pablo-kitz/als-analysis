import { ChangeEvent, useState } from "react";
import { AnalizeALSFile } from "./models";
import { ALSReport } from "types";

function App() {
	const [result, setResult] = useState<ALSReport | null>(null);
  const [error, setError] = useState<string | null>(null);

	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) {
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			const analysisResult = await AnalizeALSFile(formData);
			setResult(analysisResult);
		} catch (error) {
			if (error instanceof Error) {
        console.error("Error:", error.message);
        setError(error.message)
        throw error;
      } else if (typeof error === "string") {
        console.error("Error:", error);
        setError(error)
        throw new Error(error);
      } else {
        console.error("Unknown error occurred");
        setError("Unknown error occurred")
        throw new Error("Unknown error occurred");
      }
		}
	};

	return (
		<>
      <input type='file' name='inputfile' className='inputfile' accept='.als' onChange={handleFileUpload} />
      <div className='text-red-500'>Upload your file</div>
      {error && <div className='text-red-500'>{error}</div>}
      {result && (
        <>
          <div>File Name: {result.fileName}</div>
          <div>Live Version: {result.liveVer}</div>
          {/* Display other relevant fields from the result object */}
        </>
      )}
    </>
	);
}

export default App;
