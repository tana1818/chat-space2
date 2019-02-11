# DB設計

## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false|

### Association
has_many :messages
has_many :groups, through: :user_group
has_many :user_group

## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
has_many :users, through: :user_group
has_many :messages
has_many :user_group

## user_group table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Associtation
- belongs_to :group
- belongs_to :user

## messages table
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
belongs_to :group
belongs_to :user
