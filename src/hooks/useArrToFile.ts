export default async function useArrToFile(arr: any[]) {
  require("fs").writeFile(
    "./support/array.txt",

    JSON.stringify(arr),

    function (err: any) {
      if (err) {
        console.error("Crap happens");
      }
    }
  );
}
