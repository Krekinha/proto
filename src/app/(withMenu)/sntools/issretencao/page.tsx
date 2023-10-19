import Backbar from "../../layout/Backbar";
import ISSRetencao from "./ISSRetencao";

export default function Page() {
  return (
    <div>
      <div className="flex justify-end mr-4">
        <Backbar />
      </div>

      <div>
        <ISSRetencao />
      </div>
    </div>
  );
}
