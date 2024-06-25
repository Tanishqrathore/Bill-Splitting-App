import React, { useState } from 'react';
const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [add, updateAdd] = useState(false);
  const [friends, updateFriends] = useState(initialFriends);

  const [splitid, updateSplitid] = useState(0);
  const [found, updatefound] = useState([]);

  const balupdate = (balance) => {
    const newfriends = friends.map((x) =>
      x.id === splitid ? { ...x, balance: balance } : x
    );

    updateFriends(newfriends);
  };

  const form = (x) => {
    let a = friends.filter((friend) => x === friend.id);
    updatefound([...a]);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <Friendlist
          add={add}
          changeadd={updateAdd}
          friends={friends}
          splitid={splitid}
          updateid={updateSplitid}
          form={form}
        />
        <Addfriend add={add} changeadd={updateAdd} friends={updateFriends} />
      </div>

      {<Split splitid={splitid} item={found} balupdate={balupdate} />}
    </div>
  );
}

const Friendlist = ({ add, changeadd, friends, splitid, updateid, form }) => {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend
            data={friend}
            splitid={splitid}
            updateid={updateid}
            form={form}
          />
        ))}
      </ul>
      {!add ? (
        <button onClick={() => changeadd(!add)} className="button">
          Add friend
        </button>
      ) : null}
    </div>
  );
};
const Friend = ({ data, splitid, updateid, form }) => {
  const bal = data.balance;
  return (
    <li>
      <img src={data.image} alt="nada" />
      <h3>{data.name}</h3>
      {bal < 0 && (
        <p className="red">
          you owe {data.name} ${Math.abs(bal)}
        </p>
      )}
      {bal > 0 && (
        <p className="green">
          {data.name} owes you ${Math.abs(bal)}
        </p>
      )}
      {bal === 0 && <p>You both are even</p>}
      <button
        className="button"
        onClick={() => {
          let id1;
          data.id === splitid ? (id1 = 0) : (id1 = data.id);
          form(id1);
          updateid(id1);
        }}
      >
        Select
      </button>
    </li>
  );
};

const Split = ({ splitid, item, balupdate }) => {
  const [bill, updateBill] = useState('');
  const [myexpense, updatemyexp] = useState('');
  const [who, updatewho] = useState(0);
  const friendexpense = bill - myexpense;

  const finalbal = () => {
    let friendbal = item[0].balance;

    if (!who) {
      friendbal += friendexpense;
    } else {
      friendbal -= myexpense;
    }
    balupdate(friendbal);
    updateBill('');
    updatemyexp('');
    updatewho(0);
  };

  return splitid !== 0 ? (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {item[0].name}</h2>

      <label>💰Bill value </label>
      <input
        type="number"
        value={bill}
        onChange={(e) => updateBill(Number(e.target.value))}
      />

      <label>🪽 Your expense</label>
      <input
        type="number"
        value={myexpense}
        onChange={(e) => updatemyexp(Number(e.target.value))}
      />

      <label>🤯 Clark's expense</label>
      <input type="number" value={friendexpense} />

      <label>🤑 Who is paying the bill?</label>
      <select value={who} onChange={(e) => updatewho(Number(e.target.value))}>
        <option value={0}>you</option>
        <option value={1}>{item[0].name}</option>
      </select>

      <button
        className="button"
        onClick={(e) => {
          e.preventDefault();
          finalbal();
        }}
      >
        Split Bill
      </button>
    </form>
  ) : null;
};

const Addfriend = ({ add, changeadd, friends }) => {
  const [name, updatename] = useState(null);
  const [link, updatelink] = useState(null);

  const adder = (e) => {
    e.preventDefault();
    const newfriend = { id: Date.now(), name: name, image: link, balance: 0 };
    friends((x) => [...x, newfriend]);
  };

  return (
    <div>
      {add ? (
        <div>
          <form className="form-add-friend">
            <label>😍 Friend Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => updatename(e.target.value)}
            />

            <label>😍Image URL</label>
            <input
              type="text"
              value={link}
              onChange={(e) => {
                updatelink(e.target.value);
              }}
            />

            <button className="button" onClick={(e) => adder(e)}>
              Add
            </button>
          </form>
          <button className="button" onClick={() => changeadd(!add)}>
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
};

//what does map,filter return?
//usage of react dev tools
//number(e.target.value);
//e.target.id vs data.id
//<div>{ecdbwhj}{cjhbwj}{cbjhwb}</div> can open multiple instances of js mode in a jsx comp
//{true?<div>{}</div>} can again go in js mode(only within jsx),when already inside js mode
//understand flow of states,and how they reintialize local variabs(all){form/item waali mistake}
//jisme comp mei bhi state bana+jisme as prop gaya all rerender
