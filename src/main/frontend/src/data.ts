export interface WithId {
    id: number
}

export interface WithSeq {
    seq: number
}
export interface VotingSession extends WithId {
    name: string,
    startDate: string
}

export enum MajorityType {
    SIMPLE = 'simple',
    ABSOLUTE = 'absolute',
    EFFECTIVE = 'effective',
    UNANIMITY = 'unanimity'
}

export interface Voting extends WithSeq {
    name: string,
    majorityType: MajorityType,
}