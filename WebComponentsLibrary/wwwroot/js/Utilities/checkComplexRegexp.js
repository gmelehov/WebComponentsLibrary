export const checkComplexRegexp = (input, mustMatch, mustNotMatch) => {
    let _matches = mustMatch.every(m => { return new RegExp(m).test(input); });
    let _notMatches = (mustNotMatch && mustNotMatch.length) ? mustNotMatch.every(n => { return !(new RegExp(n).test(input)); }) : true;
    return (_matches && _notMatches);
};
