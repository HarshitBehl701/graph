import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Table() {
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-4">User Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Name</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            <span className="font-semibold">Email : </span>{" "}
            <span>email@email.com</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Password : </span>{" "}
            <span>password</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Registration Date : </span>{" "}
            <span>05-05-2025</span>
          </p>
          <div className="buttons flex items-center gap-2">
            <Button className="bg-green-700 cursor-pointer mt-2 hover:bg-green-800">
              Edit
            </Button>
            <Button className="bg-blue-600 cursor-pointer mt-2 hover:bg-blue-700">
              View
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export default Table;
