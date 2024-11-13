export const formShape = [
    {
        label: "Your Name",
        inputType: "text", 
        placeholder: "Enter your name",
        className: "form-control"
    },
    {
        label: "Number of Questions",
        inputType: "select",
        options: [{value: 10, label: 10}, {value: 15, label: 15}, {value: 20, label: 20}],
        className: "form-select"
    },
    {
        label: "Select Difficulty",
        inputType: "select",
        options: [{value: "Any", label: "Any"}, {value: "easy", label: "Easy"}, {value: "medium", label: "Medium"}, {value: "hard", label: "Hard"}],
        className: "form-select"
    },
    {
        label: "Select Type",
        inputType: "select",
        options: [{value: "Any", label: "Any"}, {value: "multiple", label: "Multiple Choice"}, {value: "boolean", label: "True/False"}],
        className: "form-select"
    },
    {
        label: "Select Category",
        inputType: "select",
        options: [],
        className: "form-select"
    }
]