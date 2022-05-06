export interface LineCoverageConfig {
    [lineno: number]: string[];
}

export interface CoverageConfig {
    [path: string]: LineCoverageConfig[];
}