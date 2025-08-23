export function getChanges(oldObj, newObj) {
    const changes = {};

    Object.keys(newObj).forEach((key) => {
        const oldValue = oldObj[key];
        const newValue = newObj[key];

        // only log if different (strict compare, can tweak)
        if (oldValue !== newValue) {
            //   changes[key] = `changed from '${oldValue ?? "null"}' to '${newValue ?? "null"}'`;
            changes[key] = <>
                Changed from
                <span className="btn btn-active btn-warning tracking-widest btn-sm m-2">{oldValue}</span> to <span className="btn btn-active btn-warning tracking-widest btn-sm m-2">{newValue}</span>
            </>
        }
    });

    return changes;
}


export const ActivityActions = [
    'Logged In',
    'Logged Out',
    'Registered',
    'Leave posted',
    'Employee created',
    'Leave Approved ', // extra space at the end is REAL
    'Leave Rejected',
    'Update User',
    'Update Employee',
]