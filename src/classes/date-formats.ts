export class DateFormats {
    /** equivalent to 'yMMMdjms' (e.g. Sep 3, 2010, 12:05:08 PM for en-US) */
    static date_format_medium: string = 'medium';
    /** equivalent to 'yMdjm' (e.g. 9/3/2010, 12:05 PM for en-US) */
    static date_format_short: string = 'short';
    /**  equivalent to 'yMMMMEEEEd' (e.g. Friday, September 3, 2010 for en-US) */
    static date_format_fullDate: string = 'fullDate';
    /** equivalent to 'yMMMMd' (e.g. September 3, 2010 for en-US) */
    static date_format_longDate: string = 'longDate';
    /** equivalent to 'yMMMd' (e.g. Sep 3, 2010 for en-US) */
    static date_format_mediumDate: string = 'mediumDate';
    /** equivalent to 'yMd' (e.g. 9/3/2010 for en-US) */
    static date_format_shortDate: string = 'shortDate';
    /** equivalent to 'jms' (e.g. 12:05:08 PM for en-US) */
    static date_format_mediumTime: string = 'mediumTime';
    /** equivalent to 'jm' (e.g. 12:05 PM for en-US) */
    static date_format_shortTime: string = 'shortTime';
    /** equivalent to 'dd/MM/yyyy' (e.g. 21/09/2014) */
    static date_format_ddMMyyyy: string = 'dd/MM/yyyy';
    /** equivalent to 'yyyy/MM/dd' (e.g. 2014/08-31) */
    static date_format_yyyyMMdd: string = 'yyyy/MM/dd';
}