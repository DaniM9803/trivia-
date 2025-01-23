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
        options: [
            {value: 5, label: 5}, 
            {value: 10, label: 10}, 
            {value: 15, label: 15}, 
            {value: 20, label: 20},
            {value: 25, label: 25},
            {value: 30, label: 30}
        ],
        className: "form-select"
    },
    {
        label: "Select Difficulty",
        inputType: "select",
        options: [
            {value: "any", label: "Any"}, 
            {value: "easy", label: "Easy"}, 
            {value: "medium", label: "Medium"}, 
            {value: "hard", label: "Hard"}
        ],
        className: "form-select"
    },
    {
        label: "Select Type",
        inputType: "select",
        options: [
            {value: "any", label: "Any"}, 
            {value: "multiple", label: "Multiple Choice"}, 
            {value: "boolean", label: "True/False"}
        ],
        className: "form-select"
    }
];