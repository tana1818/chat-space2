# DB設計

## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false|

### Association
has_many :messages
has_many :groups, through: :user_groups
has_many :user_groups

## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
has_many :users, through: :user_groups
has_many :messages
has_many :user_groups

## user_groups table

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
|text|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
belongs_to :group
belongs_to :user
