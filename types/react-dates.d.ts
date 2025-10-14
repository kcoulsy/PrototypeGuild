declare module 'react-dates' {
    import { Component } from 'react';
    import * as moment from 'moment';

    export interface SingleDatePickerProps {
        date: moment.Moment | null;
        onDateChange: (date: moment.Moment | null) => void;
        focused: boolean;
        onFocusChange: (arg: { focused: boolean | null }) => void;
        numberOfMonths?: number;
        placeholder?: string;
        [key: string]: any;
    }

    export class SingleDatePicker extends Component<SingleDatePickerProps> {}
}
