interface Props {
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    error: boolean;
    success: boolean;
}

export const Input = ({value, onChange, error, success, placeholder}: Props) => {
    return (
        <input type="text" placeholder={placeholder} disabled={success}
               className={error ? 'error' : success ? 'success' : undefined}
               value={value} onChange={e => onChange(e.target.value)}/>
    )
}