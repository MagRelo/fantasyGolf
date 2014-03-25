//'use strict';
//var mongoose = require('mongoose'),
//Schema = mongoose.Schema;
//
///**
// * Team Schema
// */
//var TeamSchema = new Schema({
//  Team_Name: {type: String, required: true},
//  Owner_Name: {type: String, required: true},
//  Player_1: {type: Number},
//  Player_2: {type: Number},
//  Player_3: {type: Number},
//  Player_4: {type: Number}
//});
//
///**
// *  Validations
// */
//TeamSchema.schema.path("Team_Name").validate(function (value) {
//  //insert validation here
//}, "Invalid message");
//
//TeamSchema.schema.path("Owner_Name").validate(function (value) {
//  //insert validation here
//}, "Invalid message");
//
//TeamSchema.schema.path("Player_1").validate(function (value) {
//  //insert validation here
//}, "Invalid message");
//
//TeamSchema.schema.path("Player_2").validate(function (value) {
//  //insert validation here
//}, "Invalid message");
//
//TeamSchema.schema.path("Player_3").validate(function (value) {
//  //insert validation here
//}, "Invalid message");
//
//TeamSchema.schema.path("Player_4").validate(function (value) {
//  //insert validation here
//}, "Invalid message");
