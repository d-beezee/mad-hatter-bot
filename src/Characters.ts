const characters = [
  { name: "Charlie" },
  { name: "Dakota" },
  { name: "Evan" },
  { name: "Julia" },
  { name: "Jack" },
];

class Characters {
  private claimedCharacters: string[] = [];

  get fullList() {
    return characters.map((character) => ({
      name: character.name,
      id: "claim-" + character.name.toLowerCase(),
      roleName: character.name.toLowerCase(),
    }));
  }
  get roles() {
    return this.fullList.map((character) => character.roleName);
  }
  get cluesChannels() {
    const results: { [key: string]: { role: string } } = {};
    for (const character of this.fullList) {
      results[character.roleName + "-clues"] = { role: character.roleName };
    }
    return results;
  }
  get dmChannels() {
    const results: {
      [key: string]: { firstRole: string; secondRole: string };
    } = {};
    for (const firstCharacter of this.fullList) {
      for (const secondCharacter of this.fullList) {
        let channelName = `${firstCharacter.roleName}-${secondCharacter.roleName}-dm`;
        if (firstCharacter.roleName === secondCharacter.roleName) continue;
        if (firstCharacter.roleName > secondCharacter.roleName) {
          channelName = `${secondCharacter.roleName}-${firstCharacter.roleName}-dm`;
        }
        if (!Object.keys(results).includes(channelName)) {
          results[channelName] = {
            firstRole: firstCharacter.roleName,
            secondRole: secondCharacter.roleName,
          };
        }
      }
    }
    return results;
  }

  get list() {
    return this.fullList.filter(
      (character) => !this.claimedCharacters.includes(character.id)
    );
  }

  public claim = (character: string) => {
    this.claimedCharacters.push(character);
  };

  public fetch = (characterToFetch: string) => {
    return this.list.find((character) => characterToFetch === character.id);
  };
}

export default new Characters();
