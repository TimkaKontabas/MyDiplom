import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";

export default function Table() {
    const columns = useMemo<MRT_ColumnDef<typeof data[number]>[]>(
        () => [
            {
                accessorKey: "firstName",
                header: "First Name",
            },
            {
                accessorKey: "lastName",
                header: "Last Name",
            },
            {
                accessorKey: "age",
                header: "Age",
            },
            {
                accessorKey: "visits",
                header: "Visits",
            }
        ],
        [],
    );
    return (
        <MaterialReactTable
            columns={columns}
            data={data}
        />
    );
}