DROP TABLE IF EXISTS goals;

CREATE TABLE goals(
    id serial PRIMARY KEY,
    goal varchar (50)
);



INSERT INTO goals(goal) VALUES ('Lose weight');
INSERT INTO goals(goal) VALUES ('Run a marathon');
INSERT INTO goals(goal) VALUES ('Climb a mountain');
INSERT INTO goals(goal) VALUES ('Eat a pound of cake');
INSERT INTO goals(goal) VALUES ('Visit the great wall');