
export interface Credentials {
    jwtToken: string,
    tokenType: string
}

export interface OptionalCredentials {
    credentials?: Credentials
}


export const storeCredentials = (creds: Credentials): void => {
    localStorage.setItem('jwtToken', creds.jwtToken)
    localStorage.setItem('tokenType', creds.tokenType)
}

export const deleteCredentials = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('tokenType')
}

export const findCredentials = (): OptionalCredentials => {
    const jwtToken = localStorage.getItem('jwtToken')
    const tokenType = localStorage.getItem('tokenType')
    if (jwtToken && tokenType) {
        const credentials: Credentials =  {
            jwtToken,
            tokenType
        }
        return {credentials}
    }
    return {}
}

export const getAuthorizationHeader = (): string => {
    const creds = findCredentials()?.credentials
    if (creds) {
        return `${creds.tokenType} ${creds.jwtToken}`
    } else {
        return ''
    }
}