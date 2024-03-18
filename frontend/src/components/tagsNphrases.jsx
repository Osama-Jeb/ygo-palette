import star from "../assets/star.png"
import { textColor } from "../helpfulfunction";

const phrase = (data, number) => {
    const frameType = data.data[number].frameType;

    return frameType === 'Spell'
        ? 'Activated a SPELL'
        : frameType === 'trap'
            ? 'Activated a TRAP'
            : 'Summoned the MONSTER';
};

const level = (level) => {
    let myLevels = [];
    for (let index = 0; index < level; index++) {
        myLevels.push(<img key={index} width={25} src={star} />)
    }
    return <div className="flex items-center gap-1">Level: {level} {myLevels}</div>
}

const tag = (tag, color) => {
    if (tag) {
        return <p style={{ backgroundColor: color }}
            className={`px-2 py-1 rounded w-fit ${color ? textColor(color) : ''}`}
        >{tag.toUpperCase()}</p>
    }
}

const atkNdef = (attack, defense) => {
    if (attack || defense) {
        return <p>
            {attack} ATK / {defense} DEF
        </p>
    }
}

export {phrase, level, tag, atkNdef}