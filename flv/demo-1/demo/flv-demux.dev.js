(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var classCallCheck = createCommonjsModule(function (module) {
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
	}
	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _typeof = unwrapExports(_typeof_1);

	var toPrimitive = createCommonjsModule(function (module) {
	var _typeof = _typeof_1["default"];
	function _toPrimitive(input, hint) {
	  if (_typeof(input) !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];
	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (_typeof(res) !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return (hint === "string" ? String : Number)(input);
	}
	module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(toPrimitive);

	var toPropertyKey = createCommonjsModule(function (module) {
	var _typeof = _typeof_1["default"];

	function _toPropertyKey(arg) {
	  var key = toPrimitive(arg, "string");
	  return _typeof(key) === "symbol" ? key : String(key);
	}
	module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(toPropertyKey);

	var createClass = createCommonjsModule(function (module) {
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}
	module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _createClass = unwrapExports(createClass);

	var FlvTag = /*#__PURE__*/function () {
	  function FlvTag() {
	    _classCallCheck(this, FlvTag);
	    this.tagType = -1;
	    this.dataSize = -1;
	    this.Timestamp = -1;
	    this.StreamID = -1;
	    this.body = -1;
	    this.time = -1;
	    this.arr = [];
	  }
	  _createClass(FlvTag, [{
	    key: "getTime",
	    value: function getTime() {
	      // this.Timestamp.pop();
	      this.arr = [];
	      for (var i = 0; i < this.Timestamp.length; i++) {
	        this.arr.push(this.Timestamp[i].toString(16).length == 1 ? '0' + this.Timestamp[i].toString(16) : this.Timestamp[i].toString(16));
	      }
	      this.arr.pop();
	      var time = this.arr.join('');
	      this.time = parseInt(time, 16);
	      return parseInt(time, 16);
	    }
	  }]);
	  return FlvTag;
	}();

	function decodeUTF8(uint8array) {
	  var out = [];
	  var input = uint8array;
	  var i = 0;
	  var length = uint8array.length;
	  while (i < length) {
	    if (input[i] < 0x80) {
	      out.push(String.fromCharCode(input[i]));
	      ++i;
	      continue;
	    } else if (input[i] < 0xC0) ; else if (input[i] < 0xE0) {
	      if (checkContinuation(input, i, 1)) {
	        var ucs4 = (input[i] & 0x1F) << 6 | input[i + 1] & 0x3F;
	        if (ucs4 >= 0x80) {
	          out.push(String.fromCharCode(ucs4 & 0xFFFF));
	          i += 2;
	          continue;
	        }
	      }
	    } else if (input[i] < 0xF0) {
	      if (checkContinuation(input, i, 2)) {
	        var _ucs = (input[i] & 0xF) << 12 | (input[i + 1] & 0x3F) << 6 | input[i + 2] & 0x3F;
	        if (_ucs >= 0x800 && (_ucs & 0xF800) !== 0xD800) {
	          out.push(String.fromCharCode(_ucs & 0xFFFF));
	          i += 3;
	          continue;
	        }
	      }
	    } else if (input[i] < 0xF8) {
	      if (checkContinuation(input, i, 3)) {
	        var _ucs2 = (input[i] & 0x7) << 18 | (input[i + 1] & 0x3F) << 12 | (input[i + 2] & 0x3F) << 6 | input[i + 3] & 0x3F;
	        if (_ucs2 > 0x10000 && _ucs2 < 0x110000) {
	          _ucs2 -= 0x10000;
	          out.push(String.fromCharCode(_ucs2 >>> 10 | 0xD800));
	          out.push(String.fromCharCode(_ucs2 & 0x3FF | 0xDC00));
	          i += 4;
	          continue;
	        }
	      }
	    }
	    out.push(String.fromCharCode(0xFFFD));
	    ++i;
	  }
	  return out.join('');
	}
	function checkContinuation(uint8array, start, checkLength) {
	  var array = uint8array;
	  if (start + checkLength < array.length) {
	    while (checkLength--) {
	      if ((array[++start] & 0xC0) !== 0x80) return false;
	    }
	    return true;
	  } else {
	    return false;
	  }
	}

	var le = function () {
	  var buf = new ArrayBuffer(2);
	  new DataView(buf).setInt16(0, 256, true); // little-endian write
	  return new Int16Array(buf)[0] === 256; // platform-spec read, if equal then LE
	}();
	var flvDemux = /*#__PURE__*/function () {
	  function flvDemux() {
	    _classCallCheck(this, flvDemux);
	  }
	  _createClass(flvDemux, null, [{
	    key: "parseObject",
	    value: function parseObject(arrayBuffer, dataOffset, dataSize) {
	      var name = flvDemux.parseString(arrayBuffer, dataOffset, dataSize);
	      var value = flvDemux.parseScript(arrayBuffer, dataOffset + name.size);
	      var isObjectEnd = value.objectEnd;
	      return {
	        data: {
	          name: name.data,
	          value: value.data
	        },
	        size: value.size,
	        objectEnd: isObjectEnd
	      };
	    }
	  }, {
	    key: "parseVariable",
	    value: function parseVariable(arrayBuffer, dataOffset, dataSize) {
	      return flvDemux.parseObject(arrayBuffer, dataOffset, dataSize);
	    }
	  }, {
	    key: "parseLongString",
	    value: function parseLongString(arrayBuffer, dataOffset, dataSize) {
	      var v = new DataView(arrayBuffer, dataOffset);
	      var length = v.getUint32(0, !le);
	      var str;
	      if (length > 0) {
	        str = decodeUTF8(new Uint8Array(arrayBuffer, dataOffset + 4, length));
	      } else {
	        str = '';
	      }
	      return {
	        data: str,
	        size: 4 + length
	      };
	    }
	  }, {
	    key: "parseDate",
	    value: function parseDate(arrayBuffer, dataOffset, dataSize) {
	      var v = new DataView(arrayBuffer, dataOffset);
	      var timestamp = v.getFloat64(0, !le);
	      var localTimeOffset = v.getInt16(8, !le);
	      timestamp += localTimeOffset * 60 * 1000; // get UTC time

	      return {
	        data: new Date(timestamp),
	        size: 8 + 2
	      };
	    }
	  }, {
	    key: "parseString",
	    value: function parseString(arrayBuffer, dataOffset, dataSize) {
	      var v = new DataView(arrayBuffer, dataOffset);
	      var length = v.getUint16(0, !le);
	      var str;
	      if (length > 0) {
	        str = decodeUTF8(new Uint8Array(arrayBuffer, dataOffset + 2, length));
	      } else {
	        str = '';
	      }
	      return {
	        data: str,
	        size: 2 + length
	      };
	    }

	    /**
	     * ??????metadata
	     */
	  }, {
	    key: "parseMetadata",
	    value: function parseMetadata(arr) {
	      var name = flvDemux.parseScript(arr, 0);
	      var value = flvDemux.parseScript(arr, name.size, arr.length - name.size);
	      // return {}
	      var data = {};
	      data[name.data] = value.data;
	      return data;
	    }
	  }, {
	    key: "parseScript",
	    value: function parseScript(arr, offset, dataSize) {
	      var dataOffset = offset;
	      var uint8 = new Uint8Array(arr);
	      var buffer = uint8.buffer;
	      var dv = new DataView(buffer, 0, dataSize);
	      var value = null;
	      var type = dv.getUint8(dataOffset);
	      dataOffset += 1;
	      switch (type) {
	        case 0:
	          // Number(Double) type
	          value = dv.getFloat64(dataOffset, !le);
	          dataOffset += 8;
	          break;
	        case 1:
	          {
	            // Boolean type
	            var b = dv.getUint8(dataOffset);
	            value = !!b;
	            dataOffset += 1;
	            break;
	          }
	        case 2:
	          {
	            // String type
	            // dataOffset += 1;
	            var amfstr = flvDemux.parseString(buffer, dataOffset);
	            value = amfstr.data;
	            dataOffset += amfstr.size;
	            break;
	          }
	        case 3:
	          {
	            // Object(s) type
	            value = {};
	            var terminal = 0; // workaround for malformed Objects which has missing ScriptDataObjectEnd
	            if ((dv.getUint32(dataSize - 4, !le) & 0x00FFFFFF) === 9) {
	              terminal = 3;
	            }
	            while (offset < dataSize - 4) {
	              // 4 === type(UI8) + ScriptDataObjectEnd(UI24)
	              var amfobj = flvDemux.parseObject(buffer, dataOffset, dataSize - offset - terminal);
	              if (amfobj.objectEnd) {
	                break;
	              }
	              value[amfobj.data.name] = amfobj.data.value;
	              // dataOffset += amfobj.size;
	              dataOffset = amfobj.size;
	            }
	            if (offset <= dataSize - 3) {
	              var marker = v.getUint32(dataOffset - 1, !le) & 0x00FFFFFF;
	              if (marker === 9) {
	                dataOffset += 3;
	              }
	            }
	            break;
	          }
	        case 8:
	          {
	            // ECMA array type (Mixed array)
	            value = {};
	            // dataOffset += 1;
	            dataOffset += 4; // ECMAArrayLength(UI32)
	            if ((dv.getUint32(dataSize - 4, !le) & 0x00FFFFFF) === 9) ;
	            while (dataOffset < dataSize - 8) {
	              // 8 === type(UI8) + ECMAArrayLength(UI32) + ScriptDataVariableEnd(UI24)
	              var amfvar = flvDemux.parseVariable(buffer, dataOffset);
	              if (amfvar.objectEnd) {
	                break;
	              }
	              value[amfvar.data.name] = amfvar.data.value;
	              dataOffset = amfvar.size;
	            }
	            if (dataOffset <= dataSize - 3) {
	              var _marker = dv.getUint32(dataOffset - 1, !le) & 0x00FFFFFF;
	              if (_marker === 9) {
	                dataOffset += 3;
	              }
	            }
	            break;
	          }
	        case 9:
	          // ScriptDataObjectEnd
	          value = undefined;
	          dataOffset = 1;
	          break;
	        case 10:
	          {
	            // Strict array type
	            // ScriptDataValue[n]. NOTE: according to video_file_format_spec_v10_1.pdf
	            value = [];
	            var strictArrayLength = dv.getUint32(dataOffset, !le);
	            dataOffset += 4;
	            for (var i = 0; i < strictArrayLength; i++) {
	              var val = flvDemux.parseScript(buffer, dataOffset);
	              value.push(val.data);
	              dataOffset = val.size;
	            }
	            break;
	          }
	        case 11:
	          {
	            // Date type
	            var date = flvDemux.parseDate(buffer, dataOffset + 1, dataSize - 1);
	            value = date.data;
	            dataOffset += date.size;
	            break;
	          }
	        case 12:
	          {
	            // Long string type
	            var amfLongStr = flvDemux.parseString(buffer, dataOffset + 1, dataSize - 1);
	            value = amfLongStr.data;
	            dataOffset += amfLongStr.size;
	            break;
	          }
	        default:
	          // ignore and skip
	          dataOffset = dataSize;
	          console.log('AMF', 'Unsupported AMF value type ' + type);
	      }
	      return {
	        data: value,
	        size: dataOffset
	      };
	    }
	  }]);
	  return flvDemux;
	}();

	var MediaInfo = /*#__PURE__*/function () {
	  function MediaInfo() {
	    _classCallCheck(this, MediaInfo);
	    this.mimeType = null;
	    this.duration = null;
	    this.hasAudio = null;
	    this.hasVideo = null;
	    this.audioCodec = null;
	    this.videoCodec = null;
	    this.audioDataRate = null;
	    this.videoDataRate = null;
	    this.audioSampleRate = null;
	    this.audioChannelCount = null;
	    this.width = null;
	    this.height = null;
	    this.fps = null;
	    this.profile = null;
	    this.level = null;
	    this.chromaFormat = null;
	    this.sarNum = null;
	    this.sarDen = null;
	    this.metadata = null;
	    this.segments = null; // MediaInfo[]
	    this.segmentCount = null;
	    this.hasKeyframesIndex = null;
	    this.keyframesIndex = null;
	  }
	  _createClass(MediaInfo, [{
	    key: "isComplete",
	    value: function isComplete() {
	      var audioInfoComplete = this.hasAudio === false || this.hasAudio === true && this.audioCodec != null && this.audioSampleRate != null && this.audioChannelCount != null;
	      var videoInfoComplete = this.hasVideo === false || this.hasVideo === true && this.videoCodec != null && this.width != null && this.height != null && this.fps != null && this.profile != null && this.level != null && this.chromaFormat != null && this.sarNum != null && this.sarDen != null;

	      // keyframesIndex may not be present
	      return this.mimeType != null && this.duration != null && this.metadata != null && this.hasKeyframesIndex != null && audioInfoComplete && videoInfoComplete;
	    }
	  }, {
	    key: "isSeekable",
	    value: function isSeekable() {
	      return this.hasKeyframesIndex === true;
	    }
	  }]);
	  return MediaInfo;
	}();

	var ExpGolomb = /*#__PURE__*/function () {
	  function ExpGolomb(uint8array) {
	    _classCallCheck(this, ExpGolomb);
	    this.TAG = this.constructor.name;
	    this._buffer = uint8array;
	    this._buffer_index = 0;
	    this._total_bytes = uint8array.byteLength;
	    this._total_bits = uint8array.byteLength * 8;
	    this._current_word = 0;
	    this._current_word_bits_left = 0;
	  }
	  _createClass(ExpGolomb, [{
	    key: "destroy",
	    value: function destroy() {
	      this._buffer = null;
	    }
	  }, {
	    key: "_fillCurrentWord",
	    value: function _fillCurrentWord() {
	      var buffer_bytes_left = this._total_bytes - this._buffer_index;
	      if (buffer_bytes_left <= 0) {
	        throw new IllegalStateException('ExpGolomb: _fillCurrentWord() but no bytes available');
	      }
	      var bytes_read = Math.min(4, buffer_bytes_left);
	      var word = new Uint8Array(4);
	      word.set(this._buffer.subarray(this._buffer_index, this._buffer_index + bytes_read));
	      this._current_word = new DataView(word.buffer).getUint32(0, false);
	      this._buffer_index += bytes_read;
	      this._current_word_bits_left = bytes_read * 8;
	    }
	  }, {
	    key: "readBits",
	    value: function readBits(bits) {
	      if (bits > 32) {
	        throw new InvalidArgumentException('ExpGolomb: readBits() bits exceeded max 32bits!');
	      }
	      if (bits <= this._current_word_bits_left) {
	        var _result = this._current_word >>> 32 - bits;
	        this._current_word <<= bits;
	        this._current_word_bits_left -= bits;
	        return _result;
	      }
	      var result = this._current_word_bits_left ? this._current_word : 0;
	      result = result >>> 32 - this._current_word_bits_left;
	      var bits_need_left = bits - this._current_word_bits_left;
	      this._fillCurrentWord();
	      var bits_read_next = Math.min(bits_need_left, this._current_word_bits_left);
	      var result2 = this._current_word >>> 32 - bits_read_next;
	      this._current_word <<= bits_read_next;
	      this._current_word_bits_left -= bits_read_next;
	      result = result << bits_read_next | result2;
	      return result;
	    }
	  }, {
	    key: "readBool",
	    value: function readBool() {
	      return this.readBits(1) === 1;
	    }
	  }, {
	    key: "readByte",
	    value: function readByte() {
	      return this.readBits(8);
	    }
	  }, {
	    key: "_skipLeadingZero",
	    value: function _skipLeadingZero() {
	      var zero_count;
	      for (zero_count = 0; zero_count < this._current_word_bits_left; zero_count++) {
	        if ((this._current_word & 0x80000000 >>> zero_count) !== 0) {
	          this._current_word <<= zero_count;
	          this._current_word_bits_left -= zero_count;
	          return zero_count;
	        }
	      }
	      this._fillCurrentWord();
	      return zero_count + this._skipLeadingZero();
	    }
	  }, {
	    key: "readUEG",
	    value: function readUEG() {
	      // unsigned exponential golomb
	      var leading_zeros = this._skipLeadingZero();
	      return this.readBits(leading_zeros + 1) - 1;
	    }
	  }, {
	    key: "readSEG",
	    value: function readSEG() {
	      // signed exponential golomb
	      var value = this.readUEG();
	      if (value & 0x01) {
	        return value + 1 >>> 1;
	      } else {
	        return -1 * (value >>> 1);
	      }
	    }
	  }]);
	  return ExpGolomb;
	}();

	var SPSParser = /*#__PURE__*/function () {
	  function SPSParser() {
	    _classCallCheck(this, SPSParser);
	  }
	  _createClass(SPSParser, null, [{
	    key: "_ebsp2rbsp",
	    value: function _ebsp2rbsp(uint8array) {
	      var src = uint8array;
	      var src_length = src.byteLength;
	      var dst = new Uint8Array(src_length);
	      var dst_idx = 0;
	      for (var i = 0; i < src_length; i++) {
	        if (i >= 2) {
	          // Unescape: Skip 0x03 after 00 00
	          if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
	            continue;
	          }
	        }
	        dst[dst_idx] = src[i];
	        dst_idx++;
	      }
	      return new Uint8Array(dst.buffer, 0, dst_idx);
	    }
	  }, {
	    key: "parseSPS",
	    value: function parseSPS(uint8array) {
	      var rbsp = SPSParser._ebsp2rbsp(uint8array);
	      var gb = new ExpGolomb(rbsp);
	      gb.readByte();
	      var profile_idc = gb.readByte(); // profile_idc
	      gb.readByte(); // constraint_set_flags[5] + reserved_zero[3]
	      var level_idc = gb.readByte(); // level_idc
	      gb.readUEG(); // seq_parameter_set_id

	      var profile_string = SPSParser.getProfileString(profile_idc);
	      var level_string = SPSParser.getLevelString(level_idc);
	      var chroma_format_idc = 1;
	      var chroma_format = 420;
	      var chroma_format_table = [0, 420, 422, 444];
	      var bit_depth = 8;
	      if (profile_idc === 100 || profile_idc === 110 || profile_idc === 122 || profile_idc === 244 || profile_idc === 44 || profile_idc === 83 || profile_idc === 86 || profile_idc === 118 || profile_idc === 128 || profile_idc === 138 || profile_idc === 144) {
	        chroma_format_idc = gb.readUEG();
	        if (chroma_format_idc === 3) {
	          gb.readBits(1); // separate_colour_plane_flag
	        }

	        if (chroma_format_idc <= 3) {
	          chroma_format = chroma_format_table[chroma_format_idc];
	        }
	        bit_depth = gb.readUEG() + 8; // bit_depth_luma_minus8
	        gb.readUEG(); // bit_depth_chroma_minus8
	        gb.readBits(1); // qpprime_y_zero_transform_bypass_flag
	        if (gb.readBool()) {
	          // seq_scaling_matrix_present_flag
	          var scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;
	          for (var i = 0; i < scaling_list_count; i++) {
	            if (gb.readBool()) {
	              // seq_scaling_list_present_flag
	              if (i < 6) {
	                SPSParser._skipScalingList(gb, 16);
	              } else {
	                SPSParser._skipScalingList(gb, 64);
	              }
	            }
	          }
	        }
	      }
	      gb.readUEG(); // log2_max_frame_num_minus4
	      var pic_order_cnt_type = gb.readUEG();
	      if (pic_order_cnt_type === 0) {
	        gb.readUEG(); // log2_max_pic_order_cnt_lsb_minus_4
	      } else if (pic_order_cnt_type === 1) {
	        gb.readBits(1); // delta_pic_order_always_zero_flag
	        gb.readSEG(); // offset_for_non_ref_pic
	        gb.readSEG(); // offset_for_top_to_bottom_field
	        var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();
	        for (var _i = 0; _i < num_ref_frames_in_pic_order_cnt_cycle; _i++) {
	          gb.readSEG(); // offset_for_ref_frame
	        }
	      }

	      gb.readUEG(); // max_num_ref_frames
	      gb.readBits(1); // gaps_in_frame_num_value_allowed_flag

	      var pic_width_in_mbs_minus1 = gb.readUEG();
	      var pic_height_in_map_units_minus1 = gb.readUEG();
	      var frame_mbs_only_flag = gb.readBits(1);
	      if (frame_mbs_only_flag === 0) {
	        gb.readBits(1); // mb_adaptive_frame_field_flag
	      }

	      gb.readBits(1); // direct_8x8_inference_flag

	      var frame_crop_left_offset = 0;
	      var frame_crop_right_offset = 0;
	      var frame_crop_top_offset = 0;
	      var frame_crop_bottom_offset = 0;
	      var frame_cropping_flag = gb.readBool();
	      if (frame_cropping_flag) {
	        frame_crop_left_offset = gb.readUEG();
	        frame_crop_right_offset = gb.readUEG();
	        frame_crop_top_offset = gb.readUEG();
	        frame_crop_bottom_offset = gb.readUEG();
	      }
	      var sar_width = 1,
	        sar_height = 1;
	      var fps = 0,
	        fps_fixed = true,
	        fps_num = 0,
	        fps_den = 0;
	      var vui_parameters_present_flag = gb.readBool();
	      if (vui_parameters_present_flag) {
	        if (gb.readBool()) {
	          // aspect_ratio_info_present_flag
	          var aspect_ratio_idc = gb.readByte();
	          var sar_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
	          var sar_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];
	          if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
	            sar_width = sar_w_table[aspect_ratio_idc - 1];
	            sar_height = sar_h_table[aspect_ratio_idc - 1];
	          } else if (aspect_ratio_idc === 255) {
	            sar_width = gb.readByte() << 8 | gb.readByte();
	            sar_height = gb.readByte() << 8 | gb.readByte();
	          }
	        }
	        if (gb.readBool()) {
	          // overscan_info_present_flag
	          gb.readBool(); // overscan_appropriate_flag
	        }

	        if (gb.readBool()) {
	          // video_signal_type_present_flag
	          gb.readBits(4); // video_format & video_full_range_flag
	          if (gb.readBool()) {
	            // colour_description_present_flag
	            gb.readBits(24); // colour_primaries & transfer_characteristics & matrix_coefficients
	          }
	        }

	        if (gb.readBool()) {
	          // chroma_loc_info_present_flag
	          gb.readUEG(); // chroma_sample_loc_type_top_field
	          gb.readUEG(); // chroma_sample_loc_type_bottom_field
	        }

	        if (gb.readBool()) {
	          // timing_info_present_flag
	          var num_units_in_tick = gb.readBits(32);
	          var time_scale = gb.readBits(32);
	          fps_fixed = gb.readBool(); // fixed_frame_rate_flag

	          fps_num = time_scale;
	          fps_den = num_units_in_tick * 2;
	          fps = fps_num / fps_den;
	        }
	      }
	      var sarScale = 1;
	      if (sar_width !== 1 || sar_height !== 1) {
	        sarScale = sar_width / sar_height;
	      }
	      var crop_unit_x = 0,
	        crop_unit_y = 0;
	      if (chroma_format_idc === 0) {
	        crop_unit_x = 1;
	        crop_unit_y = 2 - frame_mbs_only_flag;
	      } else {
	        var sub_wc = chroma_format_idc === 3 ? 1 : 2;
	        var sub_hc = chroma_format_idc === 1 ? 2 : 1;
	        crop_unit_x = sub_wc;
	        crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
	      }
	      var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
	      var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);
	      codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
	      codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;
	      var present_width = Math.ceil(codec_width * sarScale);
	      gb.destroy();
	      gb = null;
	      return {
	        profile_string: profile_string,
	        // baseline, high, high10, ...
	        level_string: level_string,
	        // 3, 3.1, 4, 4.1, 5, 5.1, ...
	        bit_depth: bit_depth,
	        // 8bit, 10bit, ...
	        chroma_format: chroma_format,
	        // 4:2:0, 4:2:2, ...
	        chroma_format_string: SPSParser.getChromaFormatString(chroma_format),
	        frame_rate: {
	          fixed: fps_fixed,
	          fps: fps,
	          fps_den: fps_den,
	          fps_num: fps_num
	        },
	        sar_ratio: {
	          width: sar_width,
	          height: sar_height
	        },
	        codec_size: {
	          width: codec_width,
	          height: codec_height
	        },
	        present_size: {
	          width: present_width,
	          height: codec_height
	        }
	      };
	    }
	  }, {
	    key: "_skipScalingList",
	    value: function _skipScalingList(gb, count) {
	      var last_scale = 8,
	        next_scale = 8;
	      var delta_scale = 0;
	      for (var i = 0; i < count; i++) {
	        if (next_scale !== 0) {
	          delta_scale = gb.readSEG();
	          next_scale = (last_scale + delta_scale + 256) % 256;
	        }
	        last_scale = next_scale === 0 ? last_scale : next_scale;
	      }
	    }
	  }, {
	    key: "getProfileString",
	    value: function getProfileString(profile_idc) {
	      switch (profile_idc) {
	        case 66:
	          return 'Baseline';
	        case 77:
	          return 'Main';
	        case 88:
	          return 'Extended';
	        case 100:
	          return 'High';
	        case 110:
	          return 'High10';
	        case 122:
	          return 'High422';
	        case 244:
	          return 'High444';
	        default:
	          return 'Unknown';
	      }
	    }
	  }, {
	    key: "getLevelString",
	    value: function getLevelString(level_idc) {
	      return (level_idc / 10).toFixed(1);
	    }
	  }, {
	    key: "getChromaFormatString",
	    value: function getChromaFormatString(chroma) {
	      switch (chroma) {
	        case 420:
	          return '4:2:0';
	        case 422:
	          return '4:2:2';
	        case 444:
	          return '4:4:4';
	        default:
	          return 'Unknown';
	      }
	    }
	  }]);
	  return SPSParser;
	}();

	var tagDemux$1 = /*#__PURE__*/function () {
	  function tagDemux() {
	    _classCallCheck(this, tagDemux);
	    this.TAG = this.constructor.name;
	    this._config = {};
	    this._onError = null;
	    this._onMediaInfo = null;
	    this._onTrackMetadata = null;
	    this._onDataAvailable = null;
	    this._dataOffset = 0;
	    this._firstParse = true;
	    this._dispatch = false;
	    this._hasAudio = false;
	    this._hasVideo = false;
	    this._audioInitialMetadataDispatched = false;
	    this._videoInitialMetadataDispatched = false;
	    this._mediaInfo = new MediaInfo();
	    this._mediaInfo.hasAudio = this._hasAudio;
	    this._mediaInfo.hasVideo = this._hasVideo;
	    this._metadata = null;
	    this._audioMetadata = null;
	    this._videoMetadata = null;
	    this._naluLengthSize = 4;
	    this._timestampBase = 0; // int32, in milliseconds
	    this._timescale = 1000;
	    this._duration = 0; // int32, in milliseconds
	    this._durationOverrided = false;
	    this._referenceFrameRate = {
	      fixed: true,
	      fps: 23.976,
	      fps_num: 23976,
	      fps_den: 1000
	    };
	    this._videoTrack = {
	      type: 'video',
	      id: 1,
	      sequenceNumber: 0,
	      addcoefficient: 2,
	      samples: [],
	      length: 0
	    };
	    this._audioTrack = {
	      type: 'audio',
	      id: 2,
	      sequenceNumber: 1,
	      addcoefficient: 2,
	      samples: [],
	      length: 0
	    };
	    this._littleEndian = function () {
	      var buf = new ArrayBuffer(2);
	      new DataView(buf).setInt16(0, 256, true); // little-endian write
	      return new Int16Array(buf)[0] === 256; // platform-spec read, if equal then LE
	    }();
	  }
	  _createClass(tagDemux, [{
	    key: "onMediaInfo",
	    value: function onMediaInfo(callback) {
	      this._onMediaInfo = callback;
	    }
	  }, {
	    key: "parseMetadata",
	    value: function parseMetadata(arr) {
	      var data = flvDemux.parseMetadata(arr);
	      this._parseScriptData(data);
	      console.log(this._mediaInfo, this._mediaInfo.isComplete());
	    }
	  }, {
	    key: "_parseScriptData",
	    value: function _parseScriptData(obj) {
	      var scriptData = obj;
	      if (scriptData.hasOwnProperty('onMetaData')) {
	        if (this._metadata) {
	          console.log(this.TAG, 'Found another onMetaData tag!');
	        }
	        this._metadata = scriptData;
	        var onMetaData = this._metadata.onMetaData;
	        if (typeof onMetaData.hasAudio === 'boolean') {
	          // hasAudio
	          this._hasAudio = onMetaData.hasAudio;
	          this._mediaInfo.hasAudio = this._hasAudio;
	        }
	        if (typeof onMetaData.hasVideo === 'boolean') {
	          // hasVideo
	          this._hasVideo = onMetaData.hasVideo;
	          this._mediaInfo.hasVideo = this._hasVideo;
	        }
	        if (typeof onMetaData.audiodatarate === 'number') {
	          // audiodatarate
	          this._mediaInfo.audioDataRate = onMetaData.audiodatarate;
	        }
	        if (typeof onMetaData.videodatarate === 'number') {
	          // videodatarate
	          this._mediaInfo.videoDataRate = onMetaData.videodatarate;
	        }
	        if (typeof onMetaData.width === 'number') {
	          // width
	          this._mediaInfo.width = onMetaData.width;
	        }
	        if (typeof onMetaData.height === 'number') {
	          // height
	          this._mediaInfo.height = onMetaData.height;
	        }
	        if (typeof onMetaData.duration === 'number') {
	          // duration
	          if (!this._durationOverrided) {
	            var duration = Math.floor(onMetaData.duration * this._timescale);
	            this._duration = duration;
	            this._mediaInfo.duration = duration;
	          }
	        } else {
	          this._mediaInfo.duration = 0;
	        }
	        if (typeof onMetaData.framerate === 'number') {
	          // framerate
	          var fps_num = Math.floor(onMetaData.framerate * 1000);
	          if (fps_num > 0) {
	            var fps = fps_num / 1000;
	            this._referenceFrameRate.fixed = true;
	            this._referenceFrameRate.fps = fps;
	            this._referenceFrameRate.fps_num = fps_num;
	            this._referenceFrameRate.fps_den = 1000;
	            this._mediaInfo.fps = fps;
	          }
	        }
	        if (_typeof(onMetaData.keyframes) === 'object') {
	          // keyframes
	          this._mediaInfo.hasKeyframesIndex = true;
	          var keyframes = onMetaData.keyframes;
	          keyframes.times = onMetaData.times;
	          keyframes.filepositions = onMetaData.filepositions;
	          this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(keyframes);
	          onMetaData.keyframes = null; // keyframes has been extracted, remove it
	        } else {
	          this._mediaInfo.hasKeyframesIndex = false;
	        }
	        this._dispatch = false;
	        this._mediaInfo.metadata = onMetaData;
	        console.log(this.TAG, 'Parsed onMetaData');
	        // if (this._mediaInfo.isComplete()) {
	        // this._onMediaInfo(this._mediaInfo);
	        // }
	        return this._mediaInfo;
	      }
	    }
	  }, {
	    key: "_parseKeyframesIndex",
	    value: function _parseKeyframesIndex(keyframes) {
	      var times = [];
	      var filepositions = [];

	      // ignore first keyframe which is actually AVC Sequence Header (AVCDecoderConfigurationRecord)
	      for (var i = 1; i < keyframes.times.length; i++) {
	        var time = this._timestampBase + Math.floor(keyframes.times[i] * 1000);
	        times.push(time);
	        filepositions.push(keyframes.filepositions[i]);
	      }
	      return {
	        times: times,
	        filepositions: filepositions
	      };
	    }

	    /**
	     * ??????tags??????moof???mdat
	     *
	     * @param {any} tags
	     *
	     * @memberof tagDemux
	     */
	  }, {
	    key: "moofTag",
	    value: function moofTag(tags) {
	      for (var i = 0; i < tags.length; i++) {
	        this._dispatch = true;
	        this.parseChunks(tags[i]);
	        // console.log("tagTimestamp", tags[i].getTime(), tags[i]);
	      }

	      if (this._isInitialMetadataDispatched()) {
	        if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
	          this._onDataAvailable(this._audioTrack, this._videoTrack);
	        }
	      }
	    }
	  }, {
	    key: "parseChunks",
	    value: function parseChunks(flvtag) {
	      switch (flvtag.tagType) {
	        case 8:
	          // Audio
	          this._parseAudioData(flvtag.body.buffer, 0, flvtag.body.length, flvtag.getTime());
	          break;
	        case 9:
	          // Video
	          this._parseVideoData(flvtag.body.buffer, 0, flvtag.body.length, flvtag.getTime(), 0);
	          break;
	        case 18:
	          // ScriptDataObject
	          this.parseMetadata(flvtag.body);
	          break;
	      }
	    }
	  }, {
	    key: "_parseVideoData",
	    value: function _parseVideoData(arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition) {
	      if (tagTimestamp == this._timestampBase && this._timestampBase != 0) {
	        console.log(tagTimestamp, this._timestampBase, '??????????????????????????????0??????');
	        // this.timestampBase(0);
	      }

	      if (dataSize <= 1) {
	        console.log(this.TAG, 'Flv: Invalid video packet, missing VideoData payload!');
	        return;
	      }
	      // ?????? video tag body ????????????
	      var spec = new Uint8Array(arrayBuffer, dataOffset, dataSize)[0];
	      // ????????????????????????
	      var frameType = (spec & 240) >>> 4;
	      // ??????????????????
	      var codecId = spec & 15;
	      if (codecId !== 7) {
	        this._onError(DemuxErrors.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: ".concat(codecId));
	        return;
	      }
	      this._parseAVCVideoPacket(arrayBuffer, dataOffset + 1, dataSize - 1, tagTimestamp, tagPosition, frameType);
	    }
	  }, {
	    key: "_parseAVCVideoPacket",
	    value: function _parseAVCVideoPacket(arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition, frameType) {
	      if (dataSize < 4) {
	        console.log(this.TAG, 'Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
	        return;
	      }
	      var le = this._littleEndian;
	      // ?????? video tag body ???2???????????????
	      var v = new DataView(arrayBuffer, dataOffset, dataSize);

	      // IF CodecID == 7  AVCPacketType
	      // 0 = AVC sequence header
	      // 1 = AVC NALU
	      // 2 = AVC end of sequence (lower level NALU sequence ender is not required or supported)
	      var packetType = v.getUint8(0);
	      // 3??????
	      // IF AVCPacketType == 1
	      //  Composition time offset
	      // ELSE
	      //  0
	      var cts = v.getUint32(0, !le) & 0x00FFFFFF;

	      // IF AVCPacketType == 0 AVCDecoderConfigurationRecord???AVC sequence header???
	      // IF AVCPacketType == 1 One or more NALUs (Full frames are required)

	      /**
	       *AVCDecoderConfigurationRecord.????????????H.264???????????????????????????sps???pps?????????
	       *??????AVC?????????????????? ?????????????????????sps???pps?????????????????????????????????????????????????????????
	       *??????????????????stop????????????start????????????seek?????????????????????????????????
	       *??? ?????????????????????sps???pps?????????.AVCDecoderConfigurationRecord???FLV?????????????????????????????????1??????
	       *?????????????????? video tag.
	       */
	      if (packetType === 0) {
	        // AVCDecoderConfigurationRecord
	        this._parseAVCDecoderConfigurationRecord(arrayBuffer, dataOffset + 4, dataSize - 4);
	      } else if (packetType === 1) {
	        // One or more Nalus
	        this._parseAVCVideoData(arrayBuffer, dataOffset + 4, dataSize - 4, tagTimestamp, tagPosition, frameType, cts);
	      } else if (packetType === 2) ; else {
	        this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Invalid video packet type ".concat(packetType));
	        return;
	      }
	    }

	    /**
	     * AVC ?????????
	     */
	  }, {
	    key: "_parseAVCDecoderConfigurationRecord",
	    value: function _parseAVCDecoderConfigurationRecord(arrayBuffer, dataOffset, dataSize) {
	      if (dataSize < 7) {
	        console.log(this.TAG, 'Flv: Invalid AVCDecoderConfigurationRecord, lack of data!');
	        return;
	      }
	      var meta = this._videoMetadata;
	      var track = this._videoTrack;
	      var le = this._littleEndian;
	      var v = new DataView(arrayBuffer, dataOffset, dataSize);
	      if (!meta) {
	        meta = this._videoMetadata = {};
	        meta.type = 'video';
	        meta.id = track.id;
	        meta.timescale = this._timescale;
	        meta.duration = this._duration;
	      } else {
	        if (typeof meta.avcc !== 'undefined') {
	          console.log(this.TAG, 'Found another AVCDecoderConfigurationRecord!');
	        }
	      }
	      var version = v.getUint8(0); // configurationVersion
	      var avcProfile = v.getUint8(1); // avcProfileIndication
	      v.getUint8(2); // profile_compatibility
	      v.getUint8(3); // AVCLevelIndication

	      if (version !== 1 || avcProfile === 0) {
	        this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord');
	        return;
	      }
	      this._naluLengthSize = (v.getUint8(4) & 3) + 1; // lengthSizeMinusOne
	      if (this._naluLengthSize !== 3 && this._naluLengthSize !== 4) {
	        // holy shit!!!
	        this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: ".concat(this._naluLengthSize - 1));
	        return;
	      }
	      var spsCount = v.getUint8(5) & 31; // numOfSequenceParameterSets
	      if (spsCount === 0 || spsCount > 1) {
	        this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Invalid H264 SPS count: ".concat(spsCount));
	        return;
	      }
	      var offset = 6;
	      for (var i = 0; i < spsCount; i++) {
	        var len = v.getUint16(offset, !le); // sequenceParameterSetLength
	        offset += 2;
	        if (len === 0) {
	          continue;
	        }

	        // Notice: Nalu without startcode header (00 00 00 01)
	        var sps = new Uint8Array(arrayBuffer, dataOffset + offset, len);
	        offset += len;
	        var config = SPSParser.parseSPS(sps);
	        meta.codecWidth = config.codec_size.width;
	        meta.codecHeight = config.codec_size.height;
	        meta.presentWidth = config.present_size.width;
	        meta.presentHeight = config.present_size.height;
	        meta.profile = config.profile_string;
	        meta.level = config.level_string;
	        meta.bitDepth = config.bit_depth;
	        meta.chromaFormat = config.chroma_format;
	        meta.sarRatio = config.sar_ratio;
	        meta.frameRate = config.frame_rate;
	        if (config.frame_rate.fixed === false || config.frame_rate.fps_num === 0 || config.frame_rate.fps_den === 0) {
	          meta.frameRate = this._referenceFrameRate;
	        }
	        var fps_den = meta.frameRate.fps_den;
	        var fps_num = meta.frameRate.fps_num;
	        meta.refSampleDuration = Math.floor(meta.timescale * (fps_den / fps_num));
	        var codecArray = sps.subarray(1, 4);
	        var codecString = 'avc1.';
	        for (var j = 0; j < 3; j++) {
	          var h = codecArray[j].toString(16);
	          if (h.length < 2) {
	            h = '0' + h;
	          }
	          codecString += h;
	        }
	        meta.codec = codecString;
	        var mi = this._mediaInfo;
	        mi.width = meta.codecWidth;
	        mi.height = meta.codecHeight;
	        mi.fps = meta.frameRate.fps;
	        mi.profile = meta.profile;
	        mi.level = meta.level;
	        mi.chromaFormat = config.chroma_format_string;
	        mi.sarNum = meta.sarRatio.width;
	        mi.sarDen = meta.sarRatio.height;
	        mi.videoCodec = codecString;
	        if (mi.hasAudio) {
	          if (mi.audioCodec != null) {
	            mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
	          }
	        } else {
	          mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + '"';
	        }
	        if (mi.isComplete()) {
	          this._onMediaInfo(mi);
	        }
	      }
	      var ppsCount = v.getUint8(offset); // numOfPictureParameterSets
	      if (ppsCount === 0 || ppsCount > 1) {
	        this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Invalid H264 PPS count: ".concat(ppsCount));
	        return;
	      }
	      offset++;
	      for (var _i = 0; _i < ppsCount; _i++) {
	        var _len = v.getUint16(offset, !le); // pictureParameterSetLength
	        offset += 2;
	        if (_len === 0) {
	          continue;
	        }

	        // pps is useless for extracting video information
	        offset += _len;
	      }
	      meta.avcc = new Uint8Array(dataSize);
	      meta.avcc.set(new Uint8Array(arrayBuffer, dataOffset, dataSize), 0);
	      console.log(this.TAG, 'Parsed AVCDecoderConfigurationRecord');
	      if (this._isInitialMetadataDispatched()) {
	        // flush parsed frames
	        if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
	          this._onDataAvailable(this._audioTrack, this._videoTrack);
	        }
	      } else {
	        this._videoInitialMetadataDispatched = true;
	      }
	      // notify new metadata
	      this._dispatch = false;
	      // if (this._onTrackMetadata) {
	      //     this._onTrackMetadata.call(null, meta);
	      // }

	      this._onTrackMetadata('video', meta);
	    }
	  }, {
	    key: "timestampBase",
	    value: function timestampBase(i) {
	      this._timestampBase = i;
	    }

	    /**
	     * ?????????AVC ??????
	     */
	  }, {
	    key: "_parseAVCVideoData",
	    value: function _parseAVCVideoData(arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition, frameType, cts) {
	      var le = this._littleEndian;
	      var v = new DataView(arrayBuffer, dataOffset, dataSize);
	      var units = [],
	        length = 0;
	      var offset = 0;
	      var lengthSize = this._naluLengthSize;
	      var dts = this._timestampBase + tagTimestamp;
	      var keyframe = frameType === 1; // from FLV Frame Type constants

	      while (offset < dataSize) {
	        if (offset + 4 >= dataSize) {
	          console.log(this.TAG, "Malformed Nalu near timestamp ".concat(dts, ", offset = ").concat(offset, ", dataSize = ").concat(dataSize));
	          break; // data not enough for next Nalu
	        }
	        // Nalu with length-header (AVC1)
	        var naluSize = v.getUint32(offset, !le); // Big-Endian read
	        if (lengthSize === 3) {
	          naluSize >>>= 8;
	        }
	        if (naluSize > dataSize - lengthSize) {
	          console.log(this.TAG, "Malformed Nalus near timestamp ".concat(dts, ", NaluSize > DataSize!"));
	          return;
	        }
	        var unitType = v.getUint8(offset + lengthSize) & 0x1F;
	        if (unitType === 5) {
	          // IDR
	          keyframe = true;
	        }
	        var data = new Uint8Array(arrayBuffer, dataOffset + offset, lengthSize + naluSize);
	        var unit = {
	          type: unitType,
	          data: data
	        };
	        units.push(unit);
	        length += data.byteLength;
	        offset += lengthSize + naluSize;
	      }
	      if (units.length) {
	        var track = this._videoTrack;
	        var avcSample = {
	          units: units,
	          length: length,
	          isKeyframe: keyframe,
	          dts: dts,
	          cts: cts,
	          pts: dts + cts
	        };
	        if (keyframe) {
	          avcSample.fileposition = tagPosition;
	        }
	        track.samples.push(avcSample);
	        track.length += length;
	      }
	    }
	  }, {
	    key: "_parseAudioData",
	    value: function _parseAudioData(arrayBuffer, dataOffset, dataSize, tagTimestamp) {
	      if (tagTimestamp == this._timestampBase && this._timestampBase != 0) {
	        console.log(tagTimestamp, this._timestampBase, '??????????????????????????????0??????');
	        // timestampBase(0);
	      }

	      if (dataSize <= 1) {
	        console.log(this.TAG, 'Flv: Invalid audio packet, missing SoundData payload!');
	        return;
	      }
	      var meta = this._audioMetadata;
	      var track = this._audioTrack;
	      if (!meta || !meta.codec) {
	        // initial metadata
	        meta = this._audioMetadata = {};
	        meta.type = 'audio';
	        meta.id = track.id;
	        meta.timescale = this._timescale;
	        meta.duration = this._duration;
	        this._littleEndian;
	        var v = new DataView(arrayBuffer, dataOffset, dataSize);
	        var soundSpec = v.getUint8(0);
	        var soundFormat = soundSpec >>> 4;
	        if (soundFormat !== 10) {
	          // AAC
	          // TODO: support MP3 audio codec
	          this._onError(DemuxErrors.CODEC_UNSUPPORTED, 'Flv: Unsupported audio codec idx: ' + soundFormat);
	          return;
	        }
	        var soundRate = 0;
	        var soundRateIndex = (soundSpec & 12) >>> 2;
	        var soundRateTable = [5500, 11025, 22050, 44100, 48000];
	        if (soundRateIndex < soundRateTable.length) {
	          soundRate = soundRateTable[soundRateIndex];
	        } else {
	          this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid audio sample rate idx: ' + soundRateIndex);
	          return;
	        }
	        var soundType = soundSpec & 1;
	        meta.audioSampleRate = soundRate;
	        meta.channelCount = soundType === 0 ? 1 : 2;
	        meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);
	        meta.codec = 'mp4a.40.5';
	      }
	      var aacData = this._parseAACAudioData(arrayBuffer, dataOffset + 1, dataSize - 1);
	      if (aacData == undefined) {
	        return;
	      }
	      if (aacData.packetType === 0) {
	        // AAC sequence header (AudioSpecificConfig)
	        if (meta.config) {
	          console.log(this.TAG, 'Found another AudioSpecificConfig!');
	        }
	        var misc = aacData.data;
	        meta.audioSampleRate = misc.samplingRate;
	        meta.channelCount = misc.channelCount;
	        meta.codec = misc.codec;
	        meta.config = misc.config;
	        // The decode result of an aac sample is 1024 PCM samples
	        meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);
	        console.log(this.TAG, 'Parsed AudioSpecificConfig');
	        if (this._isInitialMetadataDispatched()) {
	          // Non-initial metadata, force dispatch (or flush) parsed frames to remuxer
	          if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
	            this._onDataAvailable(this._audioTrack, this._videoTrack);
	          }
	        } else {
	          this._audioInitialMetadataDispatched = true;
	        }
	        // then notify new metadata
	        this._dispatch = false;
	        this._onTrackMetadata('audio', meta);
	        var mi = this._mediaInfo;
	        mi.audioCodec = 'mp4a.40.' + misc.originalAudioObjectType;
	        mi.audioSampleRate = meta.audioSampleRate;
	        mi.audioChannelCount = meta.channelCount;
	        if (mi.hasVideo) {
	          if (mi.videoCodec != null) {
	            mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
	          }
	        } else {
	          mi.mimeType = 'video/x-flv; codecs="' + mi.audioCodec + '"';
	        }
	        if (mi.isComplete()) {
	          this._onMediaInfo(mi);
	        }
	        return;
	      } else if (aacData.packetType === 1) {
	        // AAC raw frame data
	        var dts = this._timestampBase + tagTimestamp;
	        var aacSample = {
	          unit: aacData.data,
	          dts: dts,
	          pts: dts
	        };
	        track.samples.push(aacSample);
	        track.length += aacData.data.length;
	      } else {
	        console.log(this.TAG, "Flv: Unsupported AAC data type ".concat(aacData.packetType));
	      }
	    }
	  }, {
	    key: "_parseAACAudioData",
	    value: function _parseAACAudioData(arrayBuffer, dataOffset, dataSize) {
	      if (dataSize <= 1) {
	        console.log(this.TAG, 'Flv: Invalid AAC packet, missing AACPacketType or/and Data!');
	        return;
	      }
	      var result = {};
	      var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
	      result.packetType = array[0];
	      if (array[0] === 0) {
	        result.data = this._parseAACAudioSpecificConfig(arrayBuffer, dataOffset + 1, dataSize - 1);
	      } else {
	        result.data = array.subarray(1);
	      }
	      return result;
	    }
	  }, {
	    key: "_parseAACAudioSpecificConfig",
	    value: function _parseAACAudioSpecificConfig(arrayBuffer, dataOffset, dataSize) {
	      var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
	      var config = null;
	      var mpegSamplingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

	      /* Audio Object Type:
	         0: Null
	         1: AAC Main
	         2: AAC LC
	         3: AAC SSR (Scalable Sample Rate)
	         4: AAC LTP (Long Term Prediction)
	         5: HE-AAC / SBR (Spectral Band Replication)
	         6: AAC Scalable
	      */

	      var audioObjectType = 0;
	      var originalAudioObjectType = 0;
	      var samplingIndex = 0;
	      var extensionSamplingIndex = null;
	      // debugger;
	      // 5 bits
	      audioObjectType = originalAudioObjectType = array[0] >>> 3;
	      // 4 bits
	      samplingIndex = (array[0] & 0x07) << 1 | array[1] >>> 7;
	      if (samplingIndex < 0 || samplingIndex >= mpegSamplingRates.length) {
	        this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: AAC invalid sampling frequency index!');
	        return;
	      }
	      var samplingFrequence = mpegSamplingRates[samplingIndex];

	      // 4 bits
	      var channelConfig = (array[1] & 0x78) >>> 3;
	      if (channelConfig < 0 || channelConfig >= 8) {
	        this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: AAC invalid channel configuration');
	        return;
	      }
	      if (audioObjectType === 5) {
	        // HE-AAC?
	        // 4 bits
	        extensionSamplingIndex = (array[1] & 0x07) << 1 | array[2] >>> 7;
	        // 5 bits
	        (array[2] & 0x7C) >>> 2;
	      }

	      // workarounds for various browsers
	      var userAgent = self.navigator.userAgent.toLowerCase();
	      if (userAgent.indexOf('firefox') !== -1) {
	        // firefox: use SBR (HE-AAC) if freq less than 24kHz
	        if (samplingIndex >= 6) {
	          audioObjectType = 5;
	          config = new Array(4);
	          extensionSamplingIndex = samplingIndex - 3;
	        } else {
	          // use LC-AAC
	          audioObjectType = 2;
	          config = new Array(2);
	          extensionSamplingIndex = samplingIndex;
	        }
	      } else if (userAgent.indexOf('android') !== -1) {
	        // android: always use LC-AAC
	        audioObjectType = 2;
	        config = new Array(2);
	        extensionSamplingIndex = samplingIndex;
	      } else {
	        // for other browsers, e.g. chrome...
	        // Always use HE-AAC to make it easier to switch aac codec profile
	        audioObjectType = 5;
	        extensionSamplingIndex = samplingIndex;
	        config = new Array(4);
	        if (samplingIndex >= 6) {
	          extensionSamplingIndex = samplingIndex - 3;
	        } else if (channelConfig === 1) {
	          // Mono channel
	          audioObjectType = 2;
	          config = new Array(2);
	          extensionSamplingIndex = samplingIndex;
	        }
	      }
	      config[0] = audioObjectType << 3;
	      config[0] |= (samplingIndex & 0x0F) >>> 1;
	      config[1] = (samplingIndex & 0x0F) << 7;
	      config[1] |= (channelConfig & 0x0F) << 3;
	      if (audioObjectType === 5) {
	        config[1] |= (extensionSamplingIndex & 0x0F) >>> 1;
	        config[2] = (extensionSamplingIndex & 0x01) << 7;
	        // extended audio object type: force to 2 (LC-AAC)
	        config[2] |= 2 << 2;
	        config[3] = 0;
	      }
	      return {
	        config: config,
	        samplingRate: samplingFrequence,
	        channelCount: channelConfig,
	        codec: 'mp4a.40.' + audioObjectType,
	        originalAudioObjectType: originalAudioObjectType
	      };
	    }
	  }, {
	    key: "_isInitialMetadataDispatched",
	    value: function _isInitialMetadataDispatched() {
	      if (this._hasAudio && this._hasVideo) {
	        // both audio & video
	        return this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched;
	      }
	      if (this._hasAudio && !this._hasVideo) {
	        // audio only
	        return this._audioInitialMetadataDispatched;
	      }
	      if (!this._hasAudio && this._hasVideo) {
	        // video only
	        return this._videoInitialMetadataDispatched;
	      }
	    }
	  }]);
	  return tagDemux;
	}();
	var tagDemux$2 = new tagDemux$1();

	var FlvParse = /*#__PURE__*/function () {
	  function FlvParse() {
	    _classCallCheck(this, FlvParse);
	    this.tempUint8 = new Uint8Array();
	    this.arrTag = [];
	    this.index = 0;
	    this.tempArr = [];
	    this.stop = false;
	    this.offset = 0;
	    this.frist = true;
	    this._hasAudio = false;
	    this._hasVideo = false;
	  }

	  /**
	   * ?????? ?????????flv???????????????
	   */
	  _createClass(FlvParse, [{
	    key: "setFlv",
	    value: function setFlv(uint8) {
	      this.stop = false;
	      this.arrTag = [];
	      this.index = 0;
	      this.tempUint8 = uint8;
	      if (this.tempUint8.length > 13 && this.tempUint8[0] == 70 && this.tempUint8[1] == 76 && this.tempUint8[2] == 86) {
	        this.probe(this.tempUint8.buffer);
	        this.read(9); // ??????9????????????flv header tag
	        this.read(4); // ???????????????4????????? tag size
	        this.parse();
	        this.frist = false;
	        return this.offset;
	      } else if (!this.frist) {
	        return this.parse();
	      } else {
	        return this.offset;
	      }
	    }
	  }, {
	    key: "probe",
	    value: function probe(buffer) {
	      var data = new Uint8Array(buffer);
	      var mismatch = {
	        match: false
	      };
	      if (data[0] !== 0x46 || data[1] !== 0x4C || data[2] !== 0x56 || data[3] !== 0x01) {
	        return mismatch;
	      }
	      var hasAudio = (data[4] & 4) >>> 2 !== 0;
	      var hasVideo = (data[4] & 1) !== 0;
	      if (!hasAudio && !hasVideo) {
	        return mismatch;
	      }
	      this._hasAudio = tagDemux$2._hasAudio = hasAudio;
	      this._hasVideo = tagDemux$2._hasVideo = hasVideo;
	      return {
	        match: true,
	        hasAudioTrack: hasAudio,
	        hasVideoTrack: hasVideo
	      };
	    }

	    /**
	     * ????????????
	     */
	  }, {
	    key: "parse",
	    value: function parse() {
	      while (this.index < this.tempUint8.length && !this.stop) {
	        this.offset = this.index;
	        var t = new FlvTag();
	        if (this.tempUint8.length - this.index >= 11) {
	          t.tagType = this.read(1)[0]; // ??????tag??????
	          t.dataSize = this.read(3); // ??????????????????
	          t.Timestamp = this.read(4); // ??????????????????
	          t.StreamID = this.read(3); // ??????stream id
	        } else {
	          this.stop = true;
	          continue;
	        }
	        if (this.tempUint8.length - this.index >= this.getBodySum(t.dataSize) + 4) {
	          t.body = this.read(this.getBodySum(t.dataSize)); // ??????body
	          if (t.tagType == 9 && this._hasVideo) {
	            this.arrTag.push(t);
	          }
	          if (t.tagType == 8 && this._hasAudio) {
	            this.arrTag.push(t);
	          }
	          if (t.tagType == 18) {
	            this.arrTag.push(t);
	          }
	          this.read(4);
	        } else {
	          this.stop = true;
	          continue;
	        }
	        this.offset = this.index;
	      }
	      return this.offset;
	    }
	  }, {
	    key: "read",
	    value: function read(length) {
	      // let u8a = new Uint8Array(length);
	      // u8a.set(this.tempUint8.subarray(this.index, this.index + length), 0);
	      var u8a = this.tempUint8.slice(this.index, this.index + length);
	      this.index += length;
	      return u8a;
	    }

	    /**
	     * ??????tag????????????
	     */
	  }, {
	    key: "getBodySum",
	    value: function getBodySum(arr) {
	      var _str = '';
	      _str += arr[0].toString(16).length == 1 ? '0' + arr[0].toString(16) : arr[0].toString(16);
	      _str += arr[1].toString(16).length == 1 ? '0' + arr[1].toString(16) : arr[1].toString(16);
	      _str += arr[2].toString(16).length == 1 ? '0' + arr[2].toString(16) : arr[2].toString(16);
	      return parseInt(_str, 16);
	    }
	  }]);
	  return FlvParse;
	}();
	var flvparse = new FlvParse();

	var tagDemux = /*#__PURE__*/function () {
	  function tagDemux() {
	    _classCallCheck(this, tagDemux);
	    this.TAG = this.constructor.name;
	    this._config = {};
	    this._onError = null;
	    this._onMediaInfo = null;
	    this._onTrackMetadata = null;
	    this._onDataAvailable = null;
	    this._dataOffset = 0;
	    this._firstParse = true;
	    this._dispatch = false;
	    this._hasAudio = false;
	    this._hasVideo = false;
	    this._audioInitialMetadataDispatched = false;
	    this._videoInitialMetadataDispatched = false;
	    this._mediaInfo = new MediaInfo();
	    this._mediaInfo.hasAudio = this._hasAudio;
	    this._mediaInfo.hasVideo = this._hasVideo;
	    this._metadata = null;
	    this._audioMetadata = null;
	    this._videoMetadata = null;
	    this._naluLengthSize = 4;
	    this._timestampBase = 0; // int32, in milliseconds
	    this._timescale = 1000;
	    this._duration = 0; // int32, in milliseconds
	    this._durationOverrided = false;
	    this._referenceFrameRate = {
	      fixed: true,
	      fps: 23.976,
	      fps_num: 23976,
	      fps_den: 1000
	    };
	    this._videoTrack = {
	      type: 'video',
	      id: 1,
	      sequenceNumber: 0,
	      addcoefficient: 2,
	      samples: [],
	      length: 0
	    };
	    this._audioTrack = {
	      type: 'audio',
	      id: 2,
	      sequenceNumber: 1,
	      addcoefficient: 2,
	      samples: [],
	      length: 0
	    };
	    this._littleEndian = function () {
	      var buf = new ArrayBuffer(2);
	      new DataView(buf).setInt16(0, 256, true); // little-endian write
	      return new Int16Array(buf)[0] === 256; // platform-spec read, if equal then LE
	    }();
	  }
	  _createClass(tagDemux, [{
	    key: "onMediaInfo",
	    value: function onMediaInfo(callback) {
	      this._onMediaInfo = callback;
	    }
	  }, {
	    key: "parseMetadata",
	    value: function parseMetadata(arr) {
	      var data = flvDemux.parseMetadata(arr);
	      this._parseScriptData(data);
	      console.log(this._mediaInfo, this._mediaInfo.isComplete());
	    }
	  }, {
	    key: "_parseScriptData",
	    value: function _parseScriptData(obj) {
	      var scriptData = obj;
	      if (scriptData.hasOwnProperty('onMetaData')) {
	        if (this._metadata) {
	          console.log(this.TAG, 'Found another onMetaData tag!');
	        }
	        this._metadata = scriptData;
	        var onMetaData = this._metadata.onMetaData;
	        if (typeof onMetaData.hasAudio === 'boolean') {
	          // hasAudio
	          this._hasAudio = onMetaData.hasAudio;
	          this._mediaInfo.hasAudio = this._hasAudio;
	        }
	        if (typeof onMetaData.hasVideo === 'boolean') {
	          // hasVideo
	          this._hasVideo = onMetaData.hasVideo;
	          this._mediaInfo.hasVideo = this._hasVideo;
	        }
	        if (typeof onMetaData.audiodatarate === 'number') {
	          // audiodatarate
	          this._mediaInfo.audioDataRate = onMetaData.audiodatarate;
	        }
	        if (typeof onMetaData.videodatarate === 'number') {
	          // videodatarate
	          this._mediaInfo.videoDataRate = onMetaData.videodatarate;
	        }
	        if (typeof onMetaData.width === 'number') {
	          // width
	          this._mediaInfo.width = onMetaData.width;
	        }
	        if (typeof onMetaData.height === 'number') {
	          // height
	          this._mediaInfo.height = onMetaData.height;
	        }
	        if (typeof onMetaData.duration === 'number') {
	          // duration
	          if (!this._durationOverrided) {
	            var duration = Math.floor(onMetaData.duration * this._timescale);
	            this._duration = duration;
	            this._mediaInfo.duration = duration;
	          }
	        } else {
	          this._mediaInfo.duration = 0;
	        }
	        if (typeof onMetaData.framerate === 'number') {
	          // framerate
	          var fps_num = Math.floor(onMetaData.framerate * 1000);
	          if (fps_num > 0) {
	            var fps = fps_num / 1000;
	            this._referenceFrameRate.fixed = true;
	            this._referenceFrameRate.fps = fps;
	            this._referenceFrameRate.fps_num = fps_num;
	            this._referenceFrameRate.fps_den = 1000;
	            this._mediaInfo.fps = fps;
	          }
	        }
	        if (_typeof(onMetaData.keyframes) === 'object') {
	          // keyframes
	          this._mediaInfo.hasKeyframesIndex = true;
	          var keyframes = onMetaData.keyframes;
	          keyframes.times = onMetaData.times;
	          keyframes.filepositions = onMetaData.filepositions;
	          this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(keyframes);
	          onMetaData.keyframes = null; // keyframes has been extracted, remove it
	        } else {
	          this._mediaInfo.hasKeyframesIndex = false;
	        }
	        this._dispatch = false;
	        this._mediaInfo.metadata = onMetaData;
	        console.log(this.TAG, 'Parsed onMetaData');
	        // if (this._mediaInfo.isComplete()) {
	        // this._onMediaInfo(this._mediaInfo);
	        // }
	        return this._mediaInfo;
	      }
	    }
	  }, {
	    key: "_parseKeyframesIndex",
	    value: function _parseKeyframesIndex(keyframes) {
	      var times = [];
	      var filepositions = [];

	      // ignore first keyframe which is actually AVC Sequence Header (AVCDecoderConfigurationRecord)
	      for (var i = 1; i < keyframes.times.length; i++) {
	        var time = this._timestampBase + Math.floor(keyframes.times[i] * 1000);
	        times.push(time);
	        filepositions.push(keyframes.filepositions[i]);
	      }
	      return {
	        times: times,
	        filepositions: filepositions
	      };
	    }

	    /**
	     * ??????tags??????moof???mdat
	     *
	     * @param {any} tags
	     *
	     * @memberof tagDemux
	     */
	  }, {
	    key: "moofTag",
	    value: function moofTag(tags) {
	      for (var i = 0; i < tags.length; i++) {
	        this._dispatch = true;
	        this.parseChunks(tags[i]);
	        // console.log("tagTimestamp", tags[i].getTime(), tags[i]);
	      }

	      if (this._isInitialMetadataDispatched()) {
	        if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
	          this._onDataAvailable(this._audioTrack, this._videoTrack);
	        }
	      }
	    }
	  }, {
	    key: "parseChunks",
	    value: function parseChunks(flvtag) {
	      switch (flvtag.tagType) {
	        case 8:
	          // Audio
	          this._parseAudioData(flvtag.body.buffer, 0, flvtag.body.length, flvtag.getTime());
	          break;
	        case 9:
	          // Video
	          this._parseVideoData(flvtag.body.buffer, 0, flvtag.body.length, flvtag.getTime(), 0);
	          break;
	        case 18:
	          // ScriptDataObject
	          this.parseMetadata(flvtag.body);
	          break;
	      }
	    }
	  }, {
	    key: "_parseVideoData",
	    value: function _parseVideoData(arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition) {
	      if (tagTimestamp == this._timestampBase && this._timestampBase != 0) {
	        console.log(tagTimestamp, this._timestampBase, '??????????????????????????????0??????');
	        // this.timestampBase(0);
	      }

	      if (dataSize <= 1) {
	        console.log(this.TAG, 'Flv: Invalid video packet, missing VideoData payload!');
	        return;
	      }
	      // ?????? video tag body ????????????
	      var spec = new Uint8Array(arrayBuffer, dataOffset, dataSize)[0];
	      // ????????????????????????
	      var frameType = (spec & 240) >>> 4;
	      // ??????????????????
	      var codecId = spec & 15;
	      if (codecId !== 7) {
	        this._onError(DemuxErrors.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: ".concat(codecId));
	        return;
	      }
	      this._parseAVCVideoPacket(arrayBuffer, dataOffset + 1, dataSize - 1, tagTimestamp, tagPosition, frameType);
	    }
	  }, {
	    key: "_parseAVCVideoPacket",
	    value: function _parseAVCVideoPacket(arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition, frameType) {
	      if (dataSize < 4) {
	        console.log(this.TAG, 'Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
	        return;
	      }
	      var le = this._littleEndian;
	      // ?????? video tag body ???2???????????????
	      var v = new DataView(arrayBuffer, dataOffset, dataSize);

	      // IF CodecID == 7  AVCPacketType
	      // 0 = AVC sequence header
	      // 1 = AVC NALU
	      // 2 = AVC end of sequence (lower level NALU sequence ender is not required or supported)
	      var packetType = v.getUint8(0);
	      // 3??????
	      // IF AVCPacketType == 1
	      //  Composition time offset
	      // ELSE
	      //  0
	      var cts = v.getUint32(0, !le) & 0x00FFFFFF;

	      // IF AVCPacketType == 0 AVCDecoderConfigurationRecord???AVC sequence header???
	      // IF AVCPacketType == 1 One or more NALUs (Full frames are required)

	      /**
	       *AVCDecoderConfigurationRecord.????????????H.264???????????????????????????sps???pps?????????
	       *??????AVC?????????????????? ?????????????????????sps???pps?????????????????????????????????????????????????????????
	       *??????????????????stop????????????start????????????seek?????????????????????????????????
	       *??? ?????????????????????sps???pps?????????.AVCDecoderConfigurationRecord???FLV?????????????????????????????????1??????
	       *?????????????????? video tag.
	       */
	      if (packetType === 0) {
	        // AVCDecoderConfigurationRecord
	        this._parseAVCDecoderConfigurationRecord(arrayBuffer, dataOffset + 4, dataSize - 4);
	      } else if (packetType === 1) {
	        // One or more Nalus
	        this._parseAVCVideoData(arrayBuffer, dataOffset + 4, dataSize - 4, tagTimestamp, tagPosition, frameType, cts);
	      } else if (packetType === 2) ; else {
	        this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Invalid video packet type ".concat(packetType));
	        return;
	      }
	    }

	    /**
	     * AVC ?????????
	     */
	  }, {
	    key: "_parseAVCDecoderConfigurationRecord",
	    value: function _parseAVCDecoderConfigurationRecord(arrayBuffer, dataOffset, dataSize) {
	      if (dataSize < 7) {
	        console.log(this.TAG, 'Flv: Invalid AVCDecoderConfigurationRecord, lack of data!');
	        return;
	      }
	      var meta = this._videoMetadata;
	      var track = this._videoTrack;
	      var le = this._littleEndian;
	      var v = new DataView(arrayBuffer, dataOffset, dataSize);
	      if (!meta) {
	        meta = this._videoMetadata = {};
	        meta.type = 'video';
	        meta.id = track.id;
	        meta.timescale = this._timescale;
	        meta.duration = this._duration;
	      } else {
	        if (typeof meta.avcc !== 'undefined') {
	          console.log(this.TAG, 'Found another AVCDecoderConfigurationRecord!');
	        }
	      }
	      var version = v.getUint8(0); // configurationVersion
	      var avcProfile = v.getUint8(1); // avcProfileIndication
	      v.getUint8(2); // profile_compatibility
	      v.getUint8(3); // AVCLevelIndication

	      if (version !== 1 || avcProfile === 0) {
	        this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord');
	        return;
	      }
	      this._naluLengthSize = (v.getUint8(4) & 3) + 1; // lengthSizeMinusOne
	      if (this._naluLengthSize !== 3 && this._naluLengthSize !== 4) {
	        // holy shit!!!
	        this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: ".concat(this._naluLengthSize - 1));
	        return;
	      }
	      var spsCount = v.getUint8(5) & 31; // numOfSequenceParameterSets
	      if (spsCount === 0 || spsCount > 1) {
	        this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Invalid H264 SPS count: ".concat(spsCount));
	        return;
	      }
	      var offset = 6;
	      for (var i = 0; i < spsCount; i++) {
	        var len = v.getUint16(offset, !le); // sequenceParameterSetLength
	        offset += 2;
	        if (len === 0) {
	          continue;
	        }

	        // Notice: Nalu without startcode header (00 00 00 01)
	        var sps = new Uint8Array(arrayBuffer, dataOffset + offset, len);
	        offset += len;
	        var config = SPSParser.parseSPS(sps);
	        meta.codecWidth = config.codec_size.width;
	        meta.codecHeight = config.codec_size.height;
	        meta.presentWidth = config.present_size.width;
	        meta.presentHeight = config.present_size.height;
	        meta.profile = config.profile_string;
	        meta.level = config.level_string;
	        meta.bitDepth = config.bit_depth;
	        meta.chromaFormat = config.chroma_format;
	        meta.sarRatio = config.sar_ratio;
	        meta.frameRate = config.frame_rate;
	        if (config.frame_rate.fixed === false || config.frame_rate.fps_num === 0 || config.frame_rate.fps_den === 0) {
	          meta.frameRate = this._referenceFrameRate;
	        }
	        var fps_den = meta.frameRate.fps_den;
	        var fps_num = meta.frameRate.fps_num;
	        meta.refSampleDuration = Math.floor(meta.timescale * (fps_den / fps_num));
	        var codecArray = sps.subarray(1, 4);
	        var codecString = 'avc1.';
	        for (var j = 0; j < 3; j++) {
	          var h = codecArray[j].toString(16);
	          if (h.length < 2) {
	            h = '0' + h;
	          }
	          codecString += h;
	        }
	        meta.codec = codecString;
	        var mi = this._mediaInfo;
	        mi.width = meta.codecWidth;
	        mi.height = meta.codecHeight;
	        mi.fps = meta.frameRate.fps;
	        mi.profile = meta.profile;
	        mi.level = meta.level;
	        mi.chromaFormat = config.chroma_format_string;
	        mi.sarNum = meta.sarRatio.width;
	        mi.sarDen = meta.sarRatio.height;
	        mi.videoCodec = codecString;
	        if (mi.hasAudio) {
	          if (mi.audioCodec != null) {
	            mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
	          }
	        } else {
	          mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + '"';
	        }
	        if (mi.isComplete()) {
	          this._onMediaInfo(mi);
	        }
	      }
	      var ppsCount = v.getUint8(offset); // numOfPictureParameterSets
	      if (ppsCount === 0 || ppsCount > 1) {
	        this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Invalid H264 PPS count: ".concat(ppsCount));
	        return;
	      }
	      offset++;
	      for (var _i = 0; _i < ppsCount; _i++) {
	        var _len = v.getUint16(offset, !le); // pictureParameterSetLength
	        offset += 2;
	        if (_len === 0) {
	          continue;
	        }

	        // pps is useless for extracting video information
	        offset += _len;
	      }
	      meta.avcc = new Uint8Array(dataSize);
	      meta.avcc.set(new Uint8Array(arrayBuffer, dataOffset, dataSize), 0);
	      console.log(this.TAG, 'Parsed AVCDecoderConfigurationRecord');
	      if (this._isInitialMetadataDispatched()) {
	        // flush parsed frames
	        if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
	          this._onDataAvailable(this._audioTrack, this._videoTrack);
	        }
	      } else {
	        this._videoInitialMetadataDispatched = true;
	      }
	      // notify new metadata
	      this._dispatch = false;
	      // if (this._onTrackMetadata) {
	      //     this._onTrackMetadata.call(null, meta);
	      // }

	      this._onTrackMetadata('video', meta);
	    }
	  }, {
	    key: "timestampBase",
	    value: function timestampBase(i) {
	      this._timestampBase = i;
	    }

	    /**
	     * ?????????AVC ??????
	     */
	  }, {
	    key: "_parseAVCVideoData",
	    value: function _parseAVCVideoData(arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition, frameType, cts) {
	      var le = this._littleEndian;
	      var v = new DataView(arrayBuffer, dataOffset, dataSize);
	      var units = [],
	        length = 0;
	      var offset = 0;
	      var lengthSize = this._naluLengthSize;
	      var dts = this._timestampBase + tagTimestamp;
	      var keyframe = frameType === 1; // from FLV Frame Type constants

	      while (offset < dataSize) {
	        if (offset + 4 >= dataSize) {
	          console.log(this.TAG, "Malformed Nalu near timestamp ".concat(dts, ", offset = ").concat(offset, ", dataSize = ").concat(dataSize));
	          break; // data not enough for next Nalu
	        }
	        // Nalu with length-header (AVC1)
	        var naluSize = v.getUint32(offset, !le); // Big-Endian read
	        if (lengthSize === 3) {
	          naluSize >>>= 8;
	        }
	        if (naluSize > dataSize - lengthSize) {
	          console.log(this.TAG, "Malformed Nalus near timestamp ".concat(dts, ", NaluSize > DataSize!"));
	          return;
	        }
	        var unitType = v.getUint8(offset + lengthSize) & 0x1F;
	        if (unitType === 5) {
	          // IDR
	          keyframe = true;
	        }
	        var data = new Uint8Array(arrayBuffer, dataOffset + offset, lengthSize + naluSize);
	        var unit = {
	          type: unitType,
	          data: data
	        };
	        units.push(unit);
	        length += data.byteLength;
	        offset += lengthSize + naluSize;
	      }
	      if (units.length) {
	        var track = this._videoTrack;
	        var avcSample = {
	          units: units,
	          length: length,
	          isKeyframe: keyframe,
	          dts: dts,
	          cts: cts,
	          pts: dts + cts
	        };
	        if (keyframe) {
	          avcSample.fileposition = tagPosition;
	        }
	        track.samples.push(avcSample);
	        track.length += length;
	      }
	    }
	  }, {
	    key: "_parseAudioData",
	    value: function _parseAudioData(arrayBuffer, dataOffset, dataSize, tagTimestamp) {
	      if (tagTimestamp == this._timestampBase && this._timestampBase != 0) {
	        console.log(tagTimestamp, this._timestampBase, '??????????????????????????????0??????');
	        // timestampBase(0);
	      }

	      if (dataSize <= 1) {
	        console.log(this.TAG, 'Flv: Invalid audio packet, missing SoundData payload!');
	        return;
	      }
	      var meta = this._audioMetadata;
	      var track = this._audioTrack;
	      if (!meta || !meta.codec) {
	        // initial metadata
	        meta = this._audioMetadata = {};
	        meta.type = 'audio';
	        meta.id = track.id;
	        meta.timescale = this._timescale;
	        meta.duration = this._duration;
	        this._littleEndian;
	        var v = new DataView(arrayBuffer, dataOffset, dataSize);
	        var soundSpec = v.getUint8(0);
	        var soundFormat = soundSpec >>> 4;
	        if (soundFormat !== 10) {
	          // AAC
	          // TODO: support MP3 audio codec
	          this._onError(DemuxErrors.CODEC_UNSUPPORTED, 'Flv: Unsupported audio codec idx: ' + soundFormat);
	          return;
	        }
	        var soundRate = 0;
	        var soundRateIndex = (soundSpec & 12) >>> 2;
	        var soundRateTable = [5500, 11025, 22050, 44100, 48000];
	        if (soundRateIndex < soundRateTable.length) {
	          soundRate = soundRateTable[soundRateIndex];
	        } else {
	          this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid audio sample rate idx: ' + soundRateIndex);
	          return;
	        }
	        var soundType = soundSpec & 1;
	        meta.audioSampleRate = soundRate;
	        meta.channelCount = soundType === 0 ? 1 : 2;
	        meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);
	        meta.codec = 'mp4a.40.5';
	      }
	      var aacData = this._parseAACAudioData(arrayBuffer, dataOffset + 1, dataSize - 1);
	      if (aacData == undefined) {
	        return;
	      }
	      if (aacData.packetType === 0) {
	        // AAC sequence header (AudioSpecificConfig)
	        if (meta.config) {
	          console.log(this.TAG, 'Found another AudioSpecificConfig!');
	        }
	        var misc = aacData.data;
	        meta.audioSampleRate = misc.samplingRate;
	        meta.channelCount = misc.channelCount;
	        meta.codec = misc.codec;
	        meta.config = misc.config;
	        // The decode result of an aac sample is 1024 PCM samples
	        meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);
	        console.log(this.TAG, 'Parsed AudioSpecificConfig');
	        if (this._isInitialMetadataDispatched()) {
	          // Non-initial metadata, force dispatch (or flush) parsed frames to remuxer
	          if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
	            this._onDataAvailable(this._audioTrack, this._videoTrack);
	          }
	        } else {
	          this._audioInitialMetadataDispatched = true;
	        }
	        // then notify new metadata
	        this._dispatch = false;
	        this._onTrackMetadata('audio', meta);
	        var mi = this._mediaInfo;
	        mi.audioCodec = 'mp4a.40.' + misc.originalAudioObjectType;
	        mi.audioSampleRate = meta.audioSampleRate;
	        mi.audioChannelCount = meta.channelCount;
	        if (mi.hasVideo) {
	          if (mi.videoCodec != null) {
	            mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
	          }
	        } else {
	          mi.mimeType = 'video/x-flv; codecs="' + mi.audioCodec + '"';
	        }
	        if (mi.isComplete()) {
	          this._onMediaInfo(mi);
	        }
	        return;
	      } else if (aacData.packetType === 1) {
	        // AAC raw frame data
	        var dts = this._timestampBase + tagTimestamp;
	        var aacSample = {
	          unit: aacData.data,
	          dts: dts,
	          pts: dts
	        };
	        track.samples.push(aacSample);
	        track.length += aacData.data.length;
	      } else {
	        console.log(this.TAG, "Flv: Unsupported AAC data type ".concat(aacData.packetType));
	      }
	    }
	  }, {
	    key: "_parseAACAudioData",
	    value: function _parseAACAudioData(arrayBuffer, dataOffset, dataSize) {
	      if (dataSize <= 1) {
	        console.log(this.TAG, 'Flv: Invalid AAC packet, missing AACPacketType or/and Data!');
	        return;
	      }
	      var result = {};
	      var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
	      result.packetType = array[0];
	      if (array[0] === 0) {
	        result.data = this._parseAACAudioSpecificConfig(arrayBuffer, dataOffset + 1, dataSize - 1);
	      } else {
	        result.data = array.subarray(1);
	      }
	      return result;
	    }
	  }, {
	    key: "_parseAACAudioSpecificConfig",
	    value: function _parseAACAudioSpecificConfig(arrayBuffer, dataOffset, dataSize) {
	      var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
	      var config = null;
	      var mpegSamplingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

	      /* Audio Object Type:
	         0: Null
	         1: AAC Main
	         2: AAC LC
	         3: AAC SSR (Scalable Sample Rate)
	         4: AAC LTP (Long Term Prediction)
	         5: HE-AAC / SBR (Spectral Band Replication)
	         6: AAC Scalable
	      */

	      var audioObjectType = 0;
	      var originalAudioObjectType = 0;
	      var samplingIndex = 0;
	      var extensionSamplingIndex = null;
	      // debugger;
	      // 5 bits
	      audioObjectType = originalAudioObjectType = array[0] >>> 3;
	      // 4 bits
	      samplingIndex = (array[0] & 0x07) << 1 | array[1] >>> 7;
	      if (samplingIndex < 0 || samplingIndex >= mpegSamplingRates.length) {
	        this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: AAC invalid sampling frequency index!');
	        return;
	      }
	      var samplingFrequence = mpegSamplingRates[samplingIndex];

	      // 4 bits
	      var channelConfig = (array[1] & 0x78) >>> 3;
	      if (channelConfig < 0 || channelConfig >= 8) {
	        this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: AAC invalid channel configuration');
	        return;
	      }
	      if (audioObjectType === 5) {
	        // HE-AAC?
	        // 4 bits
	        extensionSamplingIndex = (array[1] & 0x07) << 1 | array[2] >>> 7;
	        // 5 bits
	        (array[2] & 0x7C) >>> 2;
	      }

	      // workarounds for various browsers
	      var userAgent = self.navigator.userAgent.toLowerCase();
	      if (userAgent.indexOf('firefox') !== -1) {
	        // firefox: use SBR (HE-AAC) if freq less than 24kHz
	        if (samplingIndex >= 6) {
	          audioObjectType = 5;
	          config = new Array(4);
	          extensionSamplingIndex = samplingIndex - 3;
	        } else {
	          // use LC-AAC
	          audioObjectType = 2;
	          config = new Array(2);
	          extensionSamplingIndex = samplingIndex;
	        }
	      } else if (userAgent.indexOf('android') !== -1) {
	        // android: always use LC-AAC
	        audioObjectType = 2;
	        config = new Array(2);
	        extensionSamplingIndex = samplingIndex;
	      } else {
	        // for other browsers, e.g. chrome...
	        // Always use HE-AAC to make it easier to switch aac codec profile
	        audioObjectType = 5;
	        extensionSamplingIndex = samplingIndex;
	        config = new Array(4);
	        if (samplingIndex >= 6) {
	          extensionSamplingIndex = samplingIndex - 3;
	        } else if (channelConfig === 1) {
	          // Mono channel
	          audioObjectType = 2;
	          config = new Array(2);
	          extensionSamplingIndex = samplingIndex;
	        }
	      }
	      config[0] = audioObjectType << 3;
	      config[0] |= (samplingIndex & 0x0F) >>> 1;
	      config[1] = (samplingIndex & 0x0F) << 7;
	      config[1] |= (channelConfig & 0x0F) << 3;
	      if (audioObjectType === 5) {
	        config[1] |= (extensionSamplingIndex & 0x0F) >>> 1;
	        config[2] = (extensionSamplingIndex & 0x01) << 7;
	        // extended audio object type: force to 2 (LC-AAC)
	        config[2] |= 2 << 2;
	        config[3] = 0;
	      }
	      return {
	        config: config,
	        samplingRate: samplingFrequence,
	        channelCount: channelConfig,
	        codec: 'mp4a.40.' + audioObjectType,
	        originalAudioObjectType: originalAudioObjectType
	      };
	    }
	  }, {
	    key: "_isInitialMetadataDispatched",
	    value: function _isInitialMetadataDispatched() {
	      if (this._hasAudio && this._hasVideo) {
	        // both audio & video
	        return this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched;
	      }
	      if (this._hasAudio && !this._hasVideo) {
	        // audio only
	        return this._audioInitialMetadataDispatched;
	      }
	      if (!this._hasAudio && this._hasVideo) {
	        // video only
	        return this._videoInitialMetadataDispatched;
	      }
	    }
	  }]);
	  return tagDemux;
	}();
	var tagdemux = new tagDemux();

	/**
	 * ???????????????flv.js
	 * ?????????????????????????????????
	 */
	/* eslint-disable */
	var MP4 = /*#__PURE__*/function () {
	  function MP4() {
	    _classCallCheck(this, MP4);
	  }
	  _createClass(MP4, null, [{
	    key: "init",
	    value: function init() {
	      MP4.types = {
	        avc1: [],
	        avcC: [],
	        btrt: [],
	        dinf: [],
	        dref: [],
	        esds: [],
	        ftyp: [],
	        hdlr: [],
	        mdat: [],
	        mdhd: [],
	        mdia: [],
	        mfhd: [],
	        minf: [],
	        moof: [],
	        moov: [],
	        mp4a: [],
	        mvex: [],
	        mvhd: [],
	        sdtp: [],
	        stbl: [],
	        stco: [],
	        stsc: [],
	        stsd: [],
	        stsz: [],
	        stts: [],
	        tfdt: [],
	        tfhd: [],
	        traf: [],
	        trak: [],
	        trun: [],
	        trex: [],
	        tkhd: [],
	        vmhd: [],
	        smhd: []
	      };
	      for (var name in MP4.types) {
	        if (MP4.types.hasOwnProperty(name)) {
	          MP4.types[name] = [name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)];
	        }
	      }
	      var constants = MP4.constants = {};
	      constants.FTYP = new Uint8Array([0x69, 0x73, 0x6F, 0x6D,
	      // major_brand: isom		isom	MP4  Base Media v1 [IS0 14496-12:2003]	ISO	YES	video/mp4
	      0x0, 0x0, 0x0, 0x1,
	      // minor_version: 0x01
	      0x69, 0x73, 0x6F, 0x6D,
	      // isom
	      0x61, 0x76, 0x63, 0x31 // avc1
	      ]);

	      constants.STSD_PREFIX = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) + flags  version?????????????????????entry count??????
	      0x00, 0x00, 0x00, 0x01 // entry_count	??????entry??????????????????entry??????type???????????????vide?????????sund???????????????type??????sample description???????????????????????????????????????video track????????????VisualSampleEntry????????????????????????audio track?????????AudioSampleEntry??????????????????
	      ]);

	      constants.STTS = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) + flags
	      0x00, 0x00, 0x00, 0x00 // entry_count     0?????????
	      ]);

	      constants.STSC = constants.STCO = constants.STTS;
	      constants.STSZ = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) + flags
	      0x00, 0x00, 0x00, 0x00,
	      // sample_size
	      0x00, 0x00, 0x00, 0x00 // sample_count
	      ]);

	      constants.HDLR_VIDEO = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) + flags
	      0x00, 0x00, 0x00, 0x00,
	      // pre_defined
	      0x76, 0x69, 0x64, 0x65,
	      // handler_type: 'vide' ???media box???????????????4?????????		???vide?????? video track
	      0x00, 0x00, 0x00, 0x00,
	      // reserved: 3 * 4 bytes
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	      // ?????????
	      0x56, 0x69, 0x64, 0x65, 0x6F, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00 // name: VideoHandler ????????????		track type name?????????\0?????????????????????
	      ]);

	      constants.HDLR_AUDIO = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) + flags
	      0x00, 0x00, 0x00, 0x00,
	      // pre_defined
	      0x73, 0x6F, 0x75, 0x6E,
	      // handler_type: 'soun'???media box???????????????4?????????		???soun?????? audio track
	      0x00, 0x00, 0x00, 0x00,
	      // reserved: 3 * 4 bytes
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	      // ?????????
	      0x53, 0x6F, 0x75, 0x6E, 0x64, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00 // name: SoundHandler ????????????		track type name?????????\0?????????????????????
	      ]);

	      constants.DREF = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) + flags
	      0x00, 0x00, 0x00, 0x01,
	      // entry_count 1???url
	      // url	box??????
	      0x00, 0x00, 0x00, 0x0C,
	      // entry_size
	      0x75, 0x72, 0x6C, 0x20,
	      // type 'url '
	      0x00, 0x00, 0x00, 0x01 // version(0) + flags ??????url?????????urn??????box flag???1???????????????????????????
	      ]);

	      // Sound media header
	      constants.SMHD = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) + flags	box?????????0???1????????????0???
	      0x00, 0x00, 0x00, 0x00 // balance(2) + reserved(2) ??????????????????[8.8] ?????????????????????0???-1.0????????????????????????1.0?????????????????????+2????????????
	      ]);

	      // video media header
	      constants.VMHD = new Uint8Array([0x00, 0x00, 0x00, 0x01,
	      // version(0) + flags
	      0x00, 0x00,
	      // graphicsmode: 2 bytes ????????????????????????0?????????????????????????????????opcolor????????????   //????????????4??????  ????????????
	      0x00, 0x00, 0x00, 0x00,
	      // opcolor: 3 * 2 bytes ???red???green???blue???
	      0x00, 0x00]);
	    }

	    /**
	     * ??????box
	     */
	  }, {
	    key: "box",
	    value: function box(type) {
	      var size = 8;
	      var result = null;
	      var datas = Array.prototype.slice.call(arguments, 1);
	      var arrayCount = datas.length;
	      for (var i = 0; i < arrayCount; i++) {
	        size += datas[i].byteLength;
	      }
	      // box????????????
	      result = new Uint8Array(size);
	      result[0] = size >>> 24 & 0xFF; // size
	      result[1] = size >>> 16 & 0xFF;
	      result[2] = size >>> 8 & 0xFF;
	      result[3] = size & 0xFF;
	      // ??????box???type
	      result.set(type, 4); // type

	      var offset = 8;
	      for (var _i = 0; _i < arrayCount; _i++) {
	        // data body
	        result.set(datas[_i], offset);
	        offset += datas[_i].byteLength;
	      }
	      return result;
	    }

	    // ??????ftyp&moov
	  }, {
	    key: "generateInitSegment",
	    value: function generateInitSegment(meta) {
	      if (meta.constructor != Array) {
	        meta = [meta];
	      }
	      var ftyp = MP4.box(MP4.types.ftyp, MP4.constants.FTYP);
	      var moov = MP4.moov(meta);
	      var result = new Uint8Array(ftyp.byteLength + moov.byteLength);
	      result.set(ftyp, 0);
	      result.set(moov, ftyp.byteLength);
	      return result;
	    }

	    // Movie metadata box
	  }, {
	    key: "moov",
	    value: function moov(meta) {
	      var mvhd = MP4.mvhd(meta[0].timescale, meta[0].duration); // /moov??????????????????box
	      var vtrak = MP4.trak(meta[0]);
	      var atrak;
	      if (meta.length > 1) {
	        atrak = MP4.trak(meta[1]);
	      }
	      var mvex = MP4.mvex(meta);
	      if (meta.length > 1) {
	        return MP4.box(MP4.types.moov, mvhd, vtrak, atrak, mvex);
	      } else {
	        return MP4.box(MP4.types.moov, mvhd, vtrak, mvex);
	      }
	    }

	    // Movie header box
	  }, {
	    key: "mvhd",
	    value: function mvhd(timescale, duration) {
	      return MP4.box(MP4.types.mvhd, new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) + flags     1??????box??????+3???flags   box?????????0???1????????????0???????????????????????????version=0???
	      0x00, 0x00, 0x00, 0x00,
	      // creation_time    ????????????  ????????????UTC??????1904-01-01??????????????????
	      0x00, 0x00, 0x00, 0x00,
	      // modification_time   ????????????
	      timescale >>> 24 & 0xFF,
	      // timescale: 4 bytes		???????????????1??????????????????????????????????????????1?????????
	      timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF,
	      // duration: 4 bytes	???track?????????????????????duration???time scale???????????????track???????????????audio track???time scale = 8000, duration = 560128????????????70.016???video track???time scale = 600, duration = 42000????????????70
	      duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x01, 0x00, 0x00,
	      // Preferred rate: 1.0   ????????????????????????16?????????16??????????????????????????????????????????????????????[16.16] ??????????????????1.0???0x00010000???????????????????????????
	      0x01, 0x00, 0x00, 0x00,
	      // PreferredVolume(1.0, 2bytes) + reserved(2bytes)	???rate?????????[8.8] ?????????1.0???0x0100?????????????????????
	      0x00, 0x00, 0x00, 0x00,
	      // reserved: 4 + 4 bytes	?????????
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00,
	      // ----begin composition matrix----
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	      // ??????????????????   ????????????
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00,
	      // ----end composition matrix----
	      0x00, 0x00, 0x00, 0x00,
	      // ----begin pre_defined 6 * 4 bytes----
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	      // pre-defined ?????????
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	      // ----end pre_defined 6 * 4 bytes----
	      0xFF, 0xFF, 0xFF, 0xFF // next_track_ID ?????????track?????????id???
	      ]));
	    }

	    // Track box
	  }, {
	    key: "trak",
	    value: function trak(meta) {
	      return MP4.box(MP4.types.trak, MP4.tkhd(meta), MP4.mdia(meta));
	    }

	    // Track header box
	  }, {
	    key: "tkhd",
	    value: function tkhd(meta) {
	      var trackId = meta.id,
	        duration = meta.duration;
	      var width = meta.presentWidth,
	        height = meta.presentHeight;
	      return MP4.box(MP4.types.tkhd, new Uint8Array([0x00, 0x00, 0x00, 0x07,
	      // version(0) + flags 1????????? box?????????0???1????????????0???????????????????????????version=0????????????????????????????????????????????????
	      // 0x000001 track_enabled????????????track???????????????
	      // 0x000002 track_in_movie????????????track????????????????????????
	      // 0x000004 track_in_preview????????????track????????????????????????
	      // ???????????????7???1+2+4 ????????????????????????track????????????track_in_movie???track_in_preview????????????????????????track??????????????????????????????hint track????????????0
	      // hint track?? ???????????????track???????????????????????????????????????????????????????????????track????????????????????????????????????
	      0x00, 0x00, 0x00, 0x00,
	      // creation_time	????????????????????????UTC??????1904-01-01??????????????????
	      0x00, 0x00, 0x00, 0x00,
	      // modification_time	????????????
	      trackId >>> 24 & 0xFF,
	      // track_ID: 4 bytes	id??????????????????????????????0
	      trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF, 0x00, 0x00, 0x00, 0x00,
	      // reserved: 4 bytes    ?????????
	      duration >>> 24 & 0xFF,
	      // duration: 4 bytes  	track???????????????
	      duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x00, 0x00, 0x00,
	      // reserved: 2 * 4 bytes    ?????????
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	      // layer(2bytes) + alternate_group(2bytes)  ?????????????????????0?????????????????????.track????????????????????????0?????????track????????????track???????????????
	      0x00, 0x00, 0x00, 0x00,
	      // volume(2bytes) + reserved(2bytes)    [8.8] ????????????????????????track???1.0???0x0100?????????????????????????????????0   +?????????
	      0x00, 0x01, 0x00, 0x00,
	      // ----begin composition matrix----
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00,
	      // ??????????????????
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00,
	      // ----end composition matrix----
	      width >>> 8 & 0xFF,
	      // //??????
	      width & 0xFF, 0x00, 0x00, height >>> 8 & 0xFF,
	      // ??????
	      height & 0xFF, 0x00, 0x00]));
	    }

	    /**
	     * ???mdia????????????container box?????????box????????????????????????????????????????????????????????????mdia???????????????????????????
	     * ??????????????????mdia????????????track??????????????????sample???????????????sample??????????????????mdia??????????????????mdhd??????
	     * ?????????hdlr???????????????minf???????????????mdhd??????media header box??????hdlr??????handler reference box???
	     * ???minf??????media information box???
	     *
	     * mdia
	     * 		mdhd
	     * 		hdlr
	     * 		minf
	     * 			smhd
	     * 			dinf
	     * 				dref
	     * 					url
	     * 			stbl
	     * 				stsd
	     * 					mp4a
	     * 						esds
	     * 				stts
	     * 				stsc
	     * 				stsz
	     * 				stco
	     */
	  }, {
	    key: "mdia",
	    value: function mdia(meta) {
	      return MP4.box(MP4.types.mdia, MP4.mdhd(meta), MP4.hdlr(meta), MP4.minf(meta));
	    }

	    // Media header box
	  }, {
	    key: "mdhd",
	    value: function mdhd(meta) {
	      var timescale = meta.timescale;
	      var duration = meta.duration;
	      return MP4.box(MP4.types.mdhd, new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) + flags // version(0) + flags		box?????????0???1????????????0???
	      0x00, 0x00, 0x00, 0x00,
	      // creation_time    ????????????
	      0x00, 0x00, 0x00, 0x00,
	      // modification_time????????????
	      timescale >>> 24 & 0xFF,
	      // timescale: 4 bytes    ???????????????1??????????????????????????????????????????1?????????
	      timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF,
	      // duration: 4 bytes  track???????????????
	      duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x55, 0xC4,
	      // language: und (undetermined) ??????????????????????????????0?????????15??????3???????????????ISO 639-2/T??????????????????
	      0x00, 0x00 // pre_defined = 0
	      ]));
	    }

	    // Media handler reference box
	  }, {
	    key: "hdlr",
	    value: function hdlr(meta) {
	      var data = null;
	      if (meta.type === 'audio') {
	        data = MP4.constants.HDLR_AUDIO;
	      } else {
	        data = MP4.constants.HDLR_VIDEO;
	      }
	      return MP4.box(MP4.types.hdlr, data);
	    }

	    /**
	    * ???minf??????????????????track???????????????handler-specific?????????media handler????????????????????????????????????????????????????????????????????????minf????????????????????????????????????????????????????????????????????????media handler?????????????????????media handler???????????????????????????????????????minf????????????container box????????????????????????box?????????
	    ?????????????????????minf???????????????header box????????????dinf???????????????stbl???????????????header box??????track type??????media handler type????????????vmhd?????????smhd?????????hmhd?????????nmhd?????????dinf??????data information box??????stbl??????sample table box????????????????????????
	    *
	    */
	    // Media infomation box
	  }, {
	    key: "minf",
	    value: function minf(meta) {
	      // header box??????track type??????media handler type????????????vmhd?????????smhd?????????hmhd?????????nmhd???
	      var xmhd = null;
	      if (meta.type === 'audio') {
	        xmhd = MP4.box(MP4.types.smhd, MP4.constants.SMHD);
	      } else {
	        xmhd = MP4.box(MP4.types.vmhd, MP4.constants.VMHD);
	      }
	      return MP4.box(MP4.types.minf, xmhd, MP4.dinf(), MP4.stbl(meta));
	    }

	    /**
	     * Data Information Box
	     * ???dinf?????????????????????????????????????????????container box??????dinf????????????????????????dref?????????data reference box???
	     * ???dref???????????????????????????url?????????urn????????????box??????????????????????????????track?????????
	     * ???????????????track??????????????????????????????????????????????????????url?????????urn????????????????????????????????????
	     * sample????????????????????????????????????????????????????????????????????????track???
	     * ???????????????????????????????????????????????????????????????url?????????urn????????????????????????????????????
	     */
	  }, {
	    key: "dinf",
	    value: function dinf() {
	      var result = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, MP4.constants.DREF));
	      return result;
	    }

	    /**
	    * Sample Table Box???stbl???
	    	*	???stbl?????????????????????MP4???????????????????????????box??????????????????????????????sample????????????
	    * 	sample??????????????????????????????????????????media???chunk??????chunk???sample????????????????????????????????????????????????
	    ???stbl????????????container box?????????box?????????sample description box???stsd??????
	    * time to sample box???stts??????sample size box???stsz???stz2??????
	    * sample to chunk box???stsc??????chunk offset box???stco???co64??????
	    * composition time to sample box???ctts??????sync sample box???stss???
	    * stsd???????????????????????????????????????????????????box?????????data reference box??????sample????????????????????????
	    * ?????????stsd??????????????????media sample?????????????????????stsd?????????????????????????????????????????????????????????????????????????????????
	    * 			stbl
	    * 				stsd
	    * 					avc1
	    * 						avcC
	    * 				stts
	    * 				stsc
	    * 				stsz
	    * 				stco
	    */
	  }, {
	    key: "stbl",
	    value: function stbl(meta) {
	      var result = MP4.box(MP4.types.stbl,
	      // type: stbl
	      MP4.stsd(meta),
	      // Sample Description Table
	      MP4.box(MP4.types.stts, MP4.constants.STTS),
	      // Time-To-Sample    ??????stts???entry count ???0
	      // ?????????????????????index ???stss
	      // ?????????CTTS box CTTS??????????????????
	      MP4.box(MP4.types.stsc, MP4.constants.STSC),
	      // Sample-To-Chunk
	      MP4.box(MP4.types.stsz, MP4.constants.STSZ),
	      // Sample size
	      MP4.box(MP4.types.stco, MP4.constants.STCO) // Chunk offset
	      );

	      return result;
	    }

	    /**
	    * Sample Description Box???stsd???
	    		box header???version?????????????????????entry count?????????
	    * 			??????entry??????????????????entry??????type???????????????vide?????????sund?????????
	    * 		??????type??????sample description???????????????????????????????????????video track???
	    * ?????????VisualSampleEntry????????????????????????audio track?????????AudioSampleEntry??????????????????
	    * * 				stsd
	    * 					mp4a
	    * 						esds
	    *
	    *
	    *
	    *
	    * 		 4 bytes - length in total
	    	 4 bytes - 4 char code of sample description table (stsd)
	    	 4 bytes - version & flags
	    	 4 bytes - number of sample entries (num_sample_entries)
	    		 [
	    		    4 bytes - length of sample entry (len_sample_entry)
	    		    4 bytes - 4 char code of sample entry
	    		    ('len_sample_entry' - 8) bytes of data
	    		 ] (repeated 'num_sample_entries' times)
	    	(4 bytes - optional 0x00000000 as end of box marker )
	    */
	  }, {
	    key: "stsd",
	    value: function stsd(meta) {
	      if (meta.type === 'audio') {
	        return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp4a(meta));
	      } else {
	        return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.avc1(meta));
	      }
	    }
	  }, {
	    key: "mp4a",
	    value: function mp4a(meta) {
	      var channelCount = meta.channelCount;
	      var sampleRate = meta.audioSampleRate;
	      var data = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // reserved(4) 6?????????????????????0???
	      0x00, 0x00, 0x00, 0x01,
	      // reserved(2) + data_reference_index(2)
	      0x00, 0x00, 0x00, 0x00,
	      // reserved: 2 * 4 bytes ?????????
	      0x00, 0x00, 0x00, 0x00, 0x00, channelCount,
	      // channelCount(2) ????????????????????????
	      0x00, 0x10,
	      // sampleSize(2)
	      0x00, 0x00, 0x00, 0x00,
	      // reserved(4) 4???????????????
	      sampleRate >>> 8 & 0xFF,
	      // Audio sample rate ???????????????16???????????????	template unsigned int(32) samplerate = {timescale of media}<<16;
	      sampleRate & 0xFF, 0x00, 0x00]);
	      return MP4.box(MP4.types.mp4a, data, MP4.esds(meta));
	    }
	  }, {
	    key: "esds",
	    value: function esds(meta) {
	      var config = meta.config;
	      var configSize = config.length;
	      var data = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version 0 + flags

	      0x03,
	      // descriptor_type    MP4ESDescrTag
	      0x17 + configSize,
	      // length3
	      0x00, 0x01,
	      // es_id
	      0x00,
	      // stream_priority

	      0x04,
	      // descriptor_type    MP4DecConfigDescrTag
	      0x0F + configSize,
	      // length
	      0x40,
	      // codec: mpeg4_audio
	      /**
	       *???objectTypeIndication???0x40?????????MPEG-4 Audio???MPEG-4 Audio generally is thought of as AAC
	       * but there is a whole framework of audio codecs that can Go in MPEG-4 Audio including AAC, BSAC, ALS, CELP,
	       * and something called MP3On4????????????????????????format???aac??????mp3???
	       * ????????????MP4DecSpecificDescr???data[0]????????????
	       */
	      0x15,
	      // stream_type: Audio
	      0x00, 0x00, 0x00,
	      // buffer_size
	      0x00, 0x00, 0x00, 0x00,
	      // maxBitrate
	      0x00, 0x00, 0x00, 0x00,
	      // avgBitrate

	      0x05 // descriptor_type MP4DecSpecificDescrTag
	      ].concat([configSize]).concat(config).concat([0x06, 0x01, 0x02 // GASpecificConfig
	      ]));

	      return MP4.box(MP4.types.esds, data);
	    }

	    /**
	     * ??????
	     *stsd??????avc1????????????
	     */
	  }, {
	    key: "avc1",
	    value: function avc1(meta) {
	      var avcc = meta.avcc;
	      var width = meta.codecWidth,
	        height = meta.codecHeight;
	      var data = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // // reserved(4)    6??????????????	Reserved???6?????????????????????0???
	      0x00, 0x00, 0x00, 0x01,
	      // reserved(2) + {{{{data_reference_index(2)  ??????????????????}}}}
	      0x00, 0x00, 0x00, 0x00,
	      // pre_defined(2) + reserved(2)
	      0x00, 0x00, 0x00, 0x00,
	      // pre_defined: 3 * 4 bytes  3*4?????????????????????
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, width >>> 8 & 0xFF,
	      // width: 2 bytes
	      width & 0xFF, height >>> 8 & 0xFF,
	      // height: 2 bytes
	      height & 0xFF, 0x00, 0x48, 0x00, 0x00,
	      // horizresolution: 4 bytes ??????
	      0x00, 0x48, 0x00, 0x00,
	      // vertresolution: 4 bytes ??????
	      0x00, 0x00, 0x00, 0x00,
	      // reserved: 4 bytes ?????????
	      0x00, 0x01,
	      // frame_count
	      // frame_count????????????????????????????????????????????????????????????1,????????????;???????????????1???????????????????????????
	      0x04,
	      //	strlen compressorname: 32 bytes			String[32]
	      // 32???8 bit    ?????????8bit????????????,??????31???8bit????????????
	      0x67, 0x31, 0x31, 0x31,
	      // compressorname: 32 bytes    ???????????????g111
	      0x00, 0x00, 0x00, 0x00,
	      //
	      0x00, 0x00, 0x00, 0x00,
	      //
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18,
	      // depth ????????????
	      0xFF, 0xFF // pre_defined = -1
	      ]);

	      return MP4.box(MP4.types.avc1, data, MP4.box(MP4.types.avcC, avcc));
	    }

	    // Movie Extends box
	  }, {
	    key: "mvex",
	    value: function mvex(meta) {
	      if (meta.length > 1) {
	        return MP4.box(MP4.types.mvex, MP4.trex(meta[0]), MP4.trex(meta[1]));
	      } else {
	        return MP4.box(MP4.types.mvex, MP4.trex(meta[0]));
	      }
	    }

	    // Track Extends box
	  }, {
	    key: "trex",
	    value: function trex(meta) {
	      var trackId = meta.id;
	      var data = new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) + flags
	      trackId >>> 24 & 0xFF,
	      // track_ID
	      trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF, 0x00, 0x00, 0x00, 0x01,
	      // default_sample_description_index
	      0x00, 0x00, 0x00, 0x00,
	      // default_sample_duration
	      0x00, 0x00, 0x00, 0x00,
	      // default_sample_size
	      0x00, 0x01, 0x00, 0x01 // default_sample_flags
	      ]);
	      // if (meta.type !== 'video') {
	      //     data[data.length - 1] = 0x00;
	      // }
	      return MP4.box(MP4.types.trex, data);
	    }

	    // Movie fragment box
	  }, {
	    key: "moof",
	    value: function moof(track, baseMediaDecodeTime) {
	      return MP4.box(MP4.types.moof, MP4.mfhd(track.sequenceNumber), MP4.traf(track, baseMediaDecodeTime));
	    }
	  }, {
	    key: "mfhd",
	    value: function mfhd(sequenceNumber) {
	      var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, sequenceNumber >>> 24 & 0xFF,
	      // sequence_number: int32
	      sequenceNumber >>> 16 & 0xFF, sequenceNumber >>> 8 & 0xFF, sequenceNumber & 0xFF]);
	      return MP4.box(MP4.types.mfhd, data);
	    }

	    // Track fragment box
	  }, {
	    key: "traf",
	    value: function traf(track, baseMediaDecodeTime) {
	      var trackId = track.id;

	      // Track fragment header box
	      var tfhd = MP4.box(MP4.types.tfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) & flags
	      trackId >>> 24 & 0xFF,
	      // track_ID
	      trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF]));
	      // Track Fragment Decode Time
	      var tfdt = MP4.box(MP4.types.tfdt, new Uint8Array([0x00, 0x00, 0x00, 0x00,
	      // version(0) & flags
	      baseMediaDecodeTime >>> 24 & 0xFF,
	      // baseMediaDecodeTime: int32
	      baseMediaDecodeTime >>> 16 & 0xFF, baseMediaDecodeTime >>> 8 & 0xFF, baseMediaDecodeTime & 0xFF]));
	      var sdtp = MP4.sdtp(track);
	      var trun = MP4.trun(track, sdtp.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
	      return MP4.box(MP4.types.traf, tfhd, tfdt, trun, sdtp);
	    }

	    // Sample Dependency Type box
	  }, {
	    key: "sdtp",
	    value: function sdtp(track) {
	      var samples = track.samples || [];
	      var sampleCount = samples.length;
	      var data = new Uint8Array(4 + sampleCount);
	      // 0~4 bytes: version(0) & flags
	      for (var i = 0; i < sampleCount; i++) {
	        var flags = samples[i].flags;
	        data[i + 4] = flags.isLeading << 6 // is_leading: 2 (bit)
	        | flags.dependsOn << 4 // sample_depends_on
	        | flags.isDependedOn << 2 // sample_is_depended_on
	        | flags.hasRedundancy; // sample_has_redundancy
	      }

	      return MP4.box(MP4.types.sdtp, data);
	    }

	    // Track fragment run box
	  }, {
	    key: "trun",
	    value: function trun(track, offset) {
	      var samples = track.samples || [];
	      var sampleCount = samples.length;
	      var dataSize = 12 + 16 * sampleCount;
	      var data = new Uint8Array(dataSize);
	      offset += 8 + dataSize;
	      data.set([0x00, 0x00, 0x0F, 0x01,
	      // version(0) & flags
	      sampleCount >>> 24 & 0xFF,
	      // sample_count
	      sampleCount >>> 16 & 0xFF, sampleCount >>> 8 & 0xFF, sampleCount & 0xFF, offset >>> 24 & 0xFF,
	      // data_offset
	      offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF], 0);
	      for (var i = 0; i < sampleCount; i++) {
	        var duration = samples[i].duration;
	        var size = samples[i].size;
	        var flags = samples[i].flags;
	        var cts = samples[i].cts;
	        data.set([duration >>> 24 & 0xFF,
	        // sample_duration
	        duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, size >>> 24 & 0xFF,
	        // sample_size
	        size >>> 16 & 0xFF, size >>> 8 & 0xFF, size & 0xFF, flags.isLeading << 2 | flags.dependsOn,
	        // sample_flags
	        flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.isNonSync, 0x00, 0x00,
	        // sample_degradation_priority
	        cts >>> 24 & 0xFF,
	        // sample_composition_time_offset
	        cts >>> 16 & 0xFF, cts >>> 8 & 0xFF, cts & 0xFF], 12 + 16 * i);
	      }
	      return MP4.box(MP4.types.trun, data);
	    }
	  }, {
	    key: "mdat",
	    value: function mdat(data) {
	      return MP4.box(MP4.types.mdat, data);
	    }
	  }]);
	  return MP4;
	}();
	MP4.init();

	// WEBPACK FOOTER //
	// ./js/mp4/mp4remux.js

	/*
	 * Copyright (C) 2016 Bilibili. All Rights Reserved.
	 *
	 * This file is modified from dailymotion's hls.js library (hls.js/src/helper/aac.js)
	 * @author zheng qian <xqq@xqq.im>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	/* eslint-disable */
	var AAC = /*#__PURE__*/function () {
	  function AAC() {
	    _classCallCheck(this, AAC);
	  }
	  _createClass(AAC, null, [{
	    key: "getSilentFrame",
	    value: function getSilentFrame(channelCount) {
	      if (channelCount === 1) {
	        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
	      } else if (channelCount === 2) {
	        return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
	      } else if (channelCount === 3) {
	        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
	      } else if (channelCount === 4) {
	        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
	      } else if (channelCount === 5) {
	        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
	      } else if (channelCount === 6) {
	        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
	      }
	      return null;
	    }
	  }]);
	  return AAC;
	}();

	// WEBPACK FOOTER //
	// ./js/mp4/aac-silent.js

	var Browser = {};
	function detect() {
	  // modified from jquery-browser-plugin

	  var ua = self.navigator.userAgent.toLowerCase();
	  var match = /(edge)\/([\w.]+)/.exec(ua) || /(opr)[\/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(iemobile)[\/]([\w.]+)/.exec(ua) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
	  var platform_match = /(ipad)/.exec(ua) || /(ipod)/.exec(ua) || /(windows phone)/.exec(ua) || /(iphone)/.exec(ua) || /(kindle)/.exec(ua) || /(android)/.exec(ua) || /(windows)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua) || /(cros)/.exec(ua) || [];
	  var matched = {
	    browser: match[5] || match[3] || match[1] || '',
	    version: match[2] || match[4] || '0',
	    majorVersion: match[4] || match[2] || '0',
	    platform: platform_match[0] || ''
	  };
	  var browser = {};
	  if (matched.browser) {
	    browser[matched.browser] = true;
	    var versionArray = matched.majorVersion.split('.');
	    browser.version = {
	      major: parseInt(matched.majorVersion, 10),
	      string: matched.version
	    };
	    if (versionArray.length > 1) {
	      browser.version.minor = parseInt(versionArray[1], 10);
	    }
	    if (versionArray.length > 2) {
	      browser.version.build = parseInt(versionArray[2], 10);
	    }
	  }
	  if (matched.platform) {
	    browser[matched.platform] = true;
	  }
	  if (browser.chrome || browser.opr || browser.safari) {
	    browser.webkit = true;
	  }

	  // MSIE. IE11 has 'rv' identifer
	  if (browser.rv || browser.iemobile) {
	    if (browser.rv) {
	      delete browser.rv;
	    }
	    var msie = 'msie';
	    matched.browser = msie;
	    browser[msie] = true;
	  }

	  // Microsoft Edge
	  if (browser.edge) {
	    delete browser.edge;
	    var msedge = 'msedge';
	    matched.browser = msedge;
	    browser[msedge] = true;
	  }

	  // Opera 15+
	  if (browser.opr) {
	    var opera = 'opera';
	    matched.browser = opera;
	    browser[opera] = true;
	  }

	  // Stock android browsers are marked as Safari
	  if (browser.safari && browser.android) {
	    var android = 'android';
	    matched.browser = android;
	    browser[android] = true;
	  }
	  browser.name = matched.browser;
	  browser.platform = matched.platform;
	  for (var key in Browser) {
	    if (Browser.hasOwnProperty(key)) {
	      delete Browser[key];
	    }
	  }
	  Object.assign(Browser, browser);
	}
	detect();

	/*
	 * Copyright (C) 2016 Bilibili. All Rights Reserved.
	 *
	 * @author zheng qian <xqq@xqq.im>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	/* eslint-disable */
	// Represents an media sample (audio / video)
	var SampleInfo = /*#__PURE__*/_createClass(function SampleInfo(dts, pts, duration, originalDts, isSync) {
	  _classCallCheck(this, SampleInfo);
	  this.dts = dts;
	  this.pts = pts;
	  this.duration = duration;
	  this.originalDts = originalDts;
	  this.isSyncPoint = isSync;
	  this.fileposition = null;
	});

	// Media Segment concept is defined in Media Source Extensions spec.
	// Particularly in ISO BMFF format, an Media Segment contains a moof box followed by a mdat box.
	var MediaSegmentInfo = /*#__PURE__*/function () {
	  function MediaSegmentInfo() {
	    _classCallCheck(this, MediaSegmentInfo);
	    this.beginDts = 0;
	    this.endDts = 0;
	    this.beginPts = 0;
	    this.endPts = 0;
	    this.originalBeginDts = 0;
	    this.originalEndDts = 0;
	    this.syncPoints = []; // SampleInfo[n], for video IDR frames only
	    this.firstSample = null; // SampleInfo
	    this.lastSample = null; // SampleInfo
	  }
	  _createClass(MediaSegmentInfo, [{
	    key: "appendSyncPoint",
	    value: function appendSyncPoint(sampleInfo) {
	      // also called Random Access Point
	      sampleInfo.isSyncPoint = true;
	      this.syncPoints.push(sampleInfo);
	    }
	  }]);
	  return MediaSegmentInfo;
	}();

	// Data structure for recording information of media segments in single track.
	var MediaSegmentInfoList = /*#__PURE__*/function () {
	  function MediaSegmentInfoList(type) {
	    _classCallCheck(this, MediaSegmentInfoList);
	    this._type = type;
	    this._list = [];
	    this._lastAppendLocation = -1; // cached last insert location
	  }
	  _createClass(MediaSegmentInfoList, [{
	    key: "type",
	    get: function get() {
	      return this._type;
	    }
	  }, {
	    key: "length",
	    get: function get() {
	      return this._list.length;
	    }
	  }, {
	    key: "isEmpty",
	    value: function isEmpty() {
	      return this._list.length === 0;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this._list = [];
	      this._lastAppendLocation = -1;
	    }
	  }, {
	    key: "_searchNearestSegmentBefore",
	    value: function _searchNearestSegmentBefore(originalBeginDts) {
	      var list = this._list;
	      if (list.length === 0) {
	        return -2;
	      }
	      var last = list.length - 1;
	      var mid = 0;
	      var lbound = 0;
	      var ubound = last;
	      var idx = 0;
	      if (originalBeginDts < list[0].originalBeginDts) {
	        idx = -1;
	        return idx;
	      }
	      while (lbound <= ubound) {
	        mid = lbound + Math.floor((ubound - lbound) / 2);
	        if (mid === last || originalBeginDts > list[mid].lastSample.originalDts && originalBeginDts < list[mid + 1].originalBeginDts) {
	          idx = mid;
	          break;
	        } else if (list[mid].originalBeginDts < originalBeginDts) {
	          lbound = mid + 1;
	        } else {
	          ubound = mid - 1;
	        }
	      }
	      return idx;
	    }
	  }, {
	    key: "_searchNearestSegmentAfter",
	    value: function _searchNearestSegmentAfter(originalBeginDts) {
	      return this._searchNearestSegmentBefore(originalBeginDts) + 1;
	    }
	  }, {
	    key: "append",
	    value: function append(mediaSegmentInfo) {
	      var list = this._list;
	      var msi = mediaSegmentInfo;
	      var lastAppendIdx = this._lastAppendLocation;
	      var insertIdx = 0;
	      if (lastAppendIdx !== -1 && lastAppendIdx < list.length && msi.originalBeginDts >= list[lastAppendIdx].lastSample.originalDts && (lastAppendIdx === list.length - 1 || lastAppendIdx < list.length - 1 && msi.originalBeginDts < list[lastAppendIdx + 1].originalBeginDts)) {
	        insertIdx = lastAppendIdx + 1; // use cached location idx
	      } else {
	        if (list.length > 0) {
	          insertIdx = this._searchNearestSegmentBefore(msi.originalBeginDts) + 1;
	        }
	      }
	      this._lastAppendLocation = insertIdx;
	      this._list.splice(insertIdx, 0, msi);
	    }
	  }, {
	    key: "getLastSegmentBefore",
	    value: function getLastSegmentBefore(originalBeginDts) {
	      var idx = this._searchNearestSegmentBefore(originalBeginDts);
	      if (idx >= 0) {
	        return this._list[idx];
	      } else {
	        // -1
	        return null;
	      }
	    }
	  }, {
	    key: "getLastSampleBefore",
	    value: function getLastSampleBefore(originalBeginDts) {
	      var segment = this.getLastSegmentBefore(originalBeginDts);
	      if (segment != null) {
	        return segment.lastSample;
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: "getLastSyncPointBefore",
	    value: function getLastSyncPointBefore(originalBeginDts) {
	      var segmentIdx = this._searchNearestSegmentBefore(originalBeginDts);
	      var syncPoints = this._list[segmentIdx].syncPoints;
	      while (syncPoints.length === 0 && segmentIdx > 0) {
	        segmentIdx--;
	        syncPoints = this._list[segmentIdx].syncPoints;
	      }
	      if (syncPoints.length > 0) {
	        return syncPoints[syncPoints.length - 1];
	      } else {
	        return null;
	      }
	    }
	  }]);
	  return MediaSegmentInfoList;
	}();

	// WEBPACK FOOTER //
	// ./js/mp4/media-segment-info.js

	// Fragmented mp4 remuxer
	var MP4Remuxer = /*#__PURE__*/function () {
	  function MP4Remuxer(config) {
	    _classCallCheck(this, MP4Remuxer);
	    this.TAG = this.constructor.name;
	    this._config = config;
	    this._isLive = config.isLive === true;
	    this._dtsBase = -1;
	    this._dtsBaseInited = false;
	    this._audioDtsBase = Infinity;
	    this._videoDtsBase = Infinity;
	    this._audioNextDts = undefined;
	    this._videoNextDts = undefined;
	    this._audioMeta = null;
	    this._videoMeta = null;
	    this._audioSegmentInfoList = new MediaSegmentInfoList('audio');
	    this._videoSegmentInfoList = new MediaSegmentInfoList('video');
	    this._onInitSegment = null;
	    this._onMediaSegment = null;

	    // Workaround for chrome < 50: Always force first sample as a Random Access Point in media segment
	    // see https://bugs.chromium.org/p/chromium/issues/detail?id=229412
	    this._forceFirstIDR = !!(Browser.chrome && (Browser.version.major < 50 || Browser.version.major === 50 && Browser.version.build < 2661));

	    // Workaround for IE11/Edge: Fill silent aac frame after keyframe-seeking
	    // Make audio beginDts equals with video beginDts, in order to fix seek freeze
	    this._fillSilentAfterSeek = Browser.msedge || Browser.msie;
	  }
	  _createClass(MP4Remuxer, [{
	    key: "destroy",
	    value: function destroy() {
	      this._dtsBase = -1;
	      this._dtsBaseInited = false;
	      this._audioMeta = null;
	      this._videoMeta = null;
	      this._audioSegmentInfoList.clear();
	      this._audioSegmentInfoList = null;
	      this._videoSegmentInfoList.clear();
	      this._videoSegmentInfoList = null;
	      this._onInitSegment = null;
	      this._onMediaSegment = null;
	    }
	  }, {
	    key: "bindDataSource",
	    value: function bindDataSource(producer) {
	      producer.onDataAvailable = this.remux.bind(this);
	      producer.onTrackMetadata = this._onTrackMetadataReceived.bind(this);
	      return this;
	    }

	    /* prototype: function onInitSegment(type: string, initSegment: ArrayBuffer): void
	       InitSegment: {
	           type: string,
	           data: ArrayBuffer,
	           codec: string,
	           container: string
	       }
	    */
	  }, {
	    key: "onInitSegment",
	    get: function get() {
	      return this._onInitSegment;
	    },
	    set: function set(callback) {
	      this._onInitSegment = callback;
	    }

	    /* prototype: function onMediaSegment(type: string, mediaSegment: MediaSegment): void
	       MediaSegment: {
	           type: string,
	           data: ArrayBuffer,
	           sampleCount: int32
	           info: MediaSegmentInfo
	       }
	    */
	  }, {
	    key: "onMediaSegment",
	    get: function get() {
	      return this._onMediaSegment;
	    },
	    set: function set(callback) {
	      this._onMediaSegment = callback;
	    }
	  }, {
	    key: "insertDiscontinuity",
	    value: function insertDiscontinuity() {
	      this._audioNextDts = this._videoNextDts = undefined;
	    }
	  }, {
	    key: "seek",
	    value: function seek(originalDts) {
	      this._videoSegmentInfoList.clear();
	      this._audioSegmentInfoList.clear();
	    }
	  }, {
	    key: "remux",
	    value: function remux(audioTrack, videoTrack) {
	      if (!this._onMediaSegment) {
	        throw new IllegalStateException('MP4Remuxer: onMediaSegment callback must be specificed!');
	      }
	      if (!this._dtsBaseInited) {
	        this._calculateDtsBase(audioTrack, videoTrack);
	      }
	      this._remuxVideo(videoTrack);
	      this._remuxAudio(audioTrack);
	    }
	  }, {
	    key: "_onTrackMetadataReceived",
	    value: function _onTrackMetadataReceived(type, metadata) {
	      var metabox = null;
	      if (type === 'audio') {
	        this._audioMeta = metadata;
	        metabox = MP4.generateInitSegment(metadata);
	        Log.v('msg+audio', metadata);
	      } else if (type === 'video') {
	        this._videoMeta = metadata;
	        metabox = MP4.generateInitSegment(metadata);
	        Log.v('msg+video', metadata);
	      } else {
	        return;
	      }

	      // dispatch metabox (Initialization Segment)
	      if (!this._onInitSegment) {
	        throw new IllegalStateException('MP4Remuxer: onInitSegment callback must be specified!');
	      }
	      this._onInitSegment(type, {
	        type: type,
	        data: metabox.buffer,
	        codec: metadata.codec,
	        container: "".concat(type, "/mp4")
	      });
	    }
	  }, {
	    key: "_calculateDtsBase",
	    value: function _calculateDtsBase(audioTrack, videoTrack) {
	      if (this._dtsBaseInited) {
	        return;
	      }
	      if (audioTrack.samples && audioTrack.samples.length) {
	        this._audioDtsBase = audioTrack.samples[0].dts;
	      }
	      if (videoTrack.samples && videoTrack.samples.length) {
	        this._videoDtsBase = videoTrack.samples[0].dts;
	      }
	      this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase);
	      this._dtsBaseInited = true;
	    }
	  }, {
	    key: "_remuxAudio",
	    value: function _remuxAudio(audioTrack) {
	      var track = audioTrack;
	      var samples = track.samples;
	      var dtsCorrection;
	      var firstDts = -1,
	        lastDts = -1;
	      var remuxSilentFrame = false;
	      var silentFrameDuration = -1;
	      if (!samples || samples.length === 0) {
	        return;
	      }
	      var bytes = 8 + track.length;
	      var mdatbox = new Uint8Array(bytes);
	      mdatbox[0] = bytes >>> 24 & 0xFF;
	      mdatbox[1] = bytes >>> 16 & 0xFF;
	      mdatbox[2] = bytes >>> 8 & 0xFF;
	      mdatbox[3] = bytes & 0xFF;
	      mdatbox.set(MP4.types.mdat, 4);
	      var offset = 8; // size + type
	      var mp4Samples = [];
	      while (samples.length) {
	        var aacSample = samples.shift();
	        var unit = aacSample.unit;
	        var originalDts = aacSample.dts - this._dtsBase;
	        if (dtsCorrection == undefined) {
	          if (this._audioNextDts == undefined) {
	            if (this._audioSegmentInfoList.isEmpty()) {
	              dtsCorrection = 0;
	              if (this._fillSilentAfterSeek && !this._videoSegmentInfoList.isEmpty()) {
	                remuxSilentFrame = true;
	              }
	            } else {
	              var lastSample = this._audioSegmentInfoList.getLastSampleBefore(originalDts);
	              if (lastSample != null) {
	                var distance = originalDts - (lastSample.originalDts + lastSample.duration);
	                if (distance <= 3) {
	                  distance = 0;
	                }
	                var expectedDts = lastSample.dts + lastSample.duration + distance;
	                dtsCorrection = originalDts - expectedDts;
	              } else {
	                // lastSample == null
	                dtsCorrection = 0;
	              }
	            }
	          } else {
	            dtsCorrection = originalDts - this._audioNextDts;
	          }
	        }
	        var dts = originalDts - dtsCorrection;
	        if (remuxSilentFrame) {
	          // align audio segment beginDts to match with current video segment's beginDts
	          var videoSegment = this._videoSegmentInfoList.getLastSegmentBefore(originalDts);
	          if (videoSegment != null && videoSegment.beginDts < dts) {
	            silentFrameDuration = dts - videoSegment.beginDts;
	            dts = videoSegment.beginDts;
	          } else {
	            remuxSilentFrame = false;
	          }
	        }
	        if (firstDts === -1) {
	          firstDts = dts;
	        }
	        if (remuxSilentFrame) {
	          remuxSilentFrame = false;
	          samples.unshift(aacSample);
	          var frame = this._generateSilentAudio(dts, silentFrameDuration);
	          if (frame == null) {
	            continue;
	          }
	          var _mp4Sample = frame.mp4Sample;
	          var _unit = frame.unit;
	          mp4Samples.push(_mp4Sample);

	          // re-allocate mdatbox buffer with new size, to fit with this silent frame
	          bytes += _unit.byteLength;
	          mdatbox = new Uint8Array(bytes);
	          mdatbox[0] = bytes >>> 24 & 0xFF;
	          mdatbox[1] = bytes >>> 16 & 0xFF;
	          mdatbox[2] = bytes >>> 8 & 0xFF;
	          mdatbox[3] = bytes & 0xFF;
	          mdatbox.set(MP4.types.mdat, 4);

	          // fill data now
	          mdatbox.set(_unit, offset);
	          offset += _unit.byteLength;
	          continue;
	        }
	        var sampleDuration = 0;
	        if (samples.length >= 1) {
	          var nextDts = samples[0].dts - this._dtsBase - dtsCorrection;
	          sampleDuration = nextDts - dts;
	        } else {
	          if (mp4Samples.length >= 1) {
	            // use second last sample duration
	            sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
	          } else {
	            // the only one sample, use reference sample duration
	            sampleDuration = this._audioMeta.refSampleDuration;
	          }
	        }
	        var mp4Sample = {
	          dts: dts,
	          pts: dts,
	          cts: 0,
	          size: unit.byteLength,
	          duration: sampleDuration,
	          originalDts: originalDts,
	          flags: {
	            isLeading: 0,
	            dependsOn: 1,
	            isDependedOn: 0,
	            hasRedundancy: 0
	          }
	        };
	        mp4Samples.push(mp4Sample);
	        mdatbox.set(unit, offset);
	        offset += unit.byteLength;
	      }
	      var latest = mp4Samples[mp4Samples.length - 1];
	      lastDts = latest.dts + latest.duration;
	      this._audioNextDts = lastDts;

	      // fill media segment info & add to info list
	      var info = new MediaSegmentInfo();
	      info.beginDts = firstDts;
	      info.endDts = lastDts;
	      info.beginPts = firstDts;
	      info.endPts = lastDts;
	      info.originalBeginDts = mp4Samples[0].originalDts;
	      info.originalEndDts = latest.originalDts + latest.duration;
	      info.firstSample = new SampleInfo(mp4Samples[0].dts, mp4Samples[0].pts, mp4Samples[0].duration, mp4Samples[0].originalDts, false);
	      info.lastSample = new SampleInfo(latest.dts, latest.pts, latest.duration, latest.originalDts, false);
	      if (!this._isLive) {
	        this._audioSegmentInfoList.append(info);
	      }
	      track.samples = mp4Samples;
	      track.sequenceNumber += track.addcoefficient;
	      var moofbox = MP4.moof(track, firstDts);
	      track.samples = [];
	      track.length = 0;
	      this._onMediaSegment('audio', {
	        type: 'audio',
	        data: this._mergeBoxes(moofbox, mdatbox).buffer,
	        sampleCount: mp4Samples.length,
	        info: info
	      });
	    }
	  }, {
	    key: "_generateSilentAudio",
	    value: function _generateSilentAudio(dts, frameDuration) {
	      Log.v(this.TAG, "GenerateSilentAudio: dts = ".concat(dts, ", duration = ").concat(frameDuration));
	      var unit = AAC.getSilentFrame(this._audioMeta.channelCount);
	      if (unit == null) {
	        Log.w(this.TAG, "Cannot generate silent aac frame for channelCount = ".concat(this._audioMeta.channelCount));
	        return null;
	      }
	      var mp4Sample = {
	        dts: dts,
	        pts: dts,
	        cts: 0,
	        size: unit.byteLength,
	        duration: frameDuration,
	        originalDts: dts,
	        flags: {
	          isLeading: 0,
	          dependsOn: 1,
	          isDependedOn: 0,
	          hasRedundancy: 0
	        }
	      };
	      return {
	        unit: unit,
	        mp4Sample: mp4Sample
	      };
	    }
	  }, {
	    key: "_remuxVideo",
	    value: function _remuxVideo(videoTrack) {
	      var track = videoTrack;
	      var samples = track.samples;
	      var dtsCorrection;
	      var firstDts = -1,
	        lastDts = -1;
	      var firstPts = -1,
	        lastPts = -1;
	      if (!samples || samples.length === 0) {
	        return;
	      }
	      var bytes = 8 + videoTrack.length;
	      var mdatbox = new Uint8Array(bytes);
	      mdatbox[0] = bytes >>> 24 & 0xFF;
	      mdatbox[1] = bytes >>> 16 & 0xFF;
	      mdatbox[2] = bytes >>> 8 & 0xFF;
	      mdatbox[3] = bytes & 0xFF;
	      mdatbox.set(MP4.types.mdat, 4);
	      var offset = 8;
	      var mp4Samples = [];
	      var info = new MediaSegmentInfo();
	      while (samples.length) {
	        var avcSample = samples.shift();
	        var keyframe = avcSample.isKeyframe;
	        var originalDts = avcSample.dts - this._dtsBase;
	        if (dtsCorrection == undefined) {
	          if (this._videoNextDts == undefined) {
	            if (this._videoSegmentInfoList.isEmpty()) {
	              dtsCorrection = 0;
	            } else {
	              var lastSample = this._videoSegmentInfoList.getLastSampleBefore(originalDts);
	              if (lastSample != null) {
	                var distance = originalDts - (lastSample.originalDts + lastSample.duration);
	                if (distance <= 3) {
	                  distance = 0;
	                }
	                var expectedDts = lastSample.dts + lastSample.duration + distance;
	                dtsCorrection = originalDts - expectedDts;
	              } else {
	                // lastSample == null
	                dtsCorrection = 0;
	              }
	            }
	          } else {
	            dtsCorrection = originalDts - this._videoNextDts;
	          }
	        }
	        var dts = originalDts - dtsCorrection;
	        var cts = avcSample.cts;
	        var pts = dts + cts;
	        if (firstDts === -1) {
	          firstDts = dts;
	          firstPts = pts;
	        }

	        // fill mdat box
	        var sampleSize = 0;
	        while (avcSample.units.length) {
	          var unit = avcSample.units.shift();
	          var data = unit.data;
	          mdatbox.set(data, offset);
	          offset += data.byteLength;
	          sampleSize += data.byteLength;
	        }
	        var sampleDuration = 0;
	        if (samples.length >= 1) {
	          var nextDts = samples[0].dts - this._dtsBase - dtsCorrection;
	          sampleDuration = nextDts - dts;
	        } else {
	          if (mp4Samples.length >= 1) {
	            // lastest sample, use second last duration
	            sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
	          } else {
	            // the only one sample, use reference duration
	            sampleDuration = this._videoMeta.refSampleDuration;
	          }
	        }
	        if (keyframe) {
	          var syncPoint = new SampleInfo(dts, pts, sampleDuration, avcSample.dts, true);
	          syncPoint.fileposition = avcSample.fileposition;
	          info.appendSyncPoint(syncPoint);
	        }
	        var mp4Sample = {
	          dts: dts,
	          pts: pts,
	          cts: cts,
	          size: sampleSize,
	          isKeyframe: keyframe,
	          duration: sampleDuration,
	          originalDts: originalDts,
	          flags: {
	            isLeading: 0,
	            dependsOn: keyframe ? 2 : 1,
	            isDependedOn: keyframe ? 1 : 0,
	            hasRedundancy: 0,
	            isNonSync: keyframe ? 0 : 1
	          }
	        };
	        mp4Samples.push(mp4Sample);
	      }
	      var latest = mp4Samples[mp4Samples.length - 1];
	      lastDts = latest.dts + latest.duration;
	      lastPts = latest.pts + latest.duration;
	      this._videoNextDts = lastDts;

	      // fill media segment info & add to info list
	      info.beginDts = firstDts;
	      info.endDts = lastDts;
	      info.beginPts = firstPts;
	      info.endPts = lastPts;
	      info.originalBeginDts = mp4Samples[0].originalDts;
	      info.originalEndDts = latest.originalDts + latest.duration;
	      info.firstSample = new SampleInfo(mp4Samples[0].dts, mp4Samples[0].pts, mp4Samples[0].duration, mp4Samples[0].originalDts, mp4Samples[0].isKeyframe);
	      info.lastSample = new SampleInfo(latest.dts, latest.pts, latest.duration, latest.originalDts, latest.isKeyframe);
	      if (!this._isLive) {
	        this._videoSegmentInfoList.append(info);
	      }
	      track.samples = mp4Samples;
	      track.sequenceNumber += track.addcoefficient;

	      // workaround for chrome < 50: force first sample as a random access point
	      // see https://bugs.chromium.org/p/chromium/issues/detail?id=229412
	      if (this._forceFirstIDR) {
	        var flags = mp4Samples[0].flags;
	        flags.dependsOn = 2;
	        flags.isNonSync = 0;
	      }
	      var moofbox = MP4.moof(track, firstDts);
	      track.samples = [];
	      track.length = 0;
	      this._onMediaSegment('video', {
	        type: 'video',
	        data: this._mergeBoxes(moofbox, mdatbox).buffer,
	        sampleCount: mp4Samples.length,
	        info: info
	      });
	    }
	  }, {
	    key: "_mergeBoxes",
	    value: function _mergeBoxes(moof, mdat) {
	      var result = new Uint8Array(moof.byteLength + mdat.byteLength);
	      result.set(moof, 0);
	      result.set(mdat, moof.byteLength);
	      return result;
	    }
	  }]);
	  return MP4Remuxer;
	}();

	// WEBPACK FOOTER //
	// ./js/mp4/mp4moof.js

	var flv2fmp4 = /*#__PURE__*/function () {
	  /**
	   * Creates an instance of flv2fmp4.
	   * config ?????????_isLive??????,???????????????
	   * @param {any} config
	   *
	   * @memberof flv2fmp4
	   */
	  function flv2fmp4(config) {
	    _classCallCheck(this, flv2fmp4);
	    this._config = {
	      _isLive: false
	    };
	    this._config = Object.assign(this._config, config);

	    // ??????????????????
	    this.onInitSegment = null;
	    this.onMediaSegment = null;
	    this.onMediaInfo = null;
	    this.seekCallBack = null;

	    // ????????????
	    this.loadmetadata = false;
	    this.ftyp_moov = null;
	    this.metaSuccRun = false;
	    this.metas = [];
	    this.parseChunk = null;
	    this.hasVideo = false;
	    this.hasAudio = false;
	    // ????????????seek??????
	    this._pendingResolveSeekPoint = -1;

	    // ????????????flv??????????????????
	    this._tempBaseTime = 0;

	    // ??????flv????????????
	    this.setflvBase = this.setflvBasefrist;
	    tagdemux._onTrackMetadata = this.Metadata.bind(this);
	    tagdemux._onMediaInfo = this.metaSucc.bind(this);
	    tagdemux._onDataAvailable = this.onDataAvailable.bind(this);
	    this.m4mof = new MP4Remuxer(this._config);
	    this.m4mof.onMediaSegment = this.onMdiaSegment.bind(this);
	  }
	  _createClass(flv2fmp4, [{
	    key: "seek",
	    value: function seek(baseTime) {
	      this.setflvBase = this.setflvBasefrist;
	      if (baseTime == undefined || baseTime == 0) {
	        baseTime = 0;
	        this._pendingResolveSeekPoint = -1;
	      }
	      if (this._tempBaseTime != baseTime) {
	        this._tempBaseTime = baseTime;
	        tagdemux._timestampBase = baseTime;
	        this.m4mof.seek(baseTime);
	        this.m4mof.insertDiscontinuity();
	        this._pendingResolveSeekPoint = baseTime;
	      }
	    }

	    /**
	     * ??????????????????????????????!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	     * ?????????????????????,???seek????????????????????????,
	     *
	     * @param {any} arraybuff
	     * @param {any} baseTime
	     * @returns
	     *
	     * @memberof flv2fmp4
	     */
	  }, {
	    key: "setflvBasefrist",
	    value: function setflvBasefrist(arraybuff, baseTime) {
	      var offset = flvparse.setFlv(new Uint8Array(arraybuff));
	      if (flvparse.arrTag.length > 0) {
	        this.hasAudio = flvparse._hasAudio;
	        this.hasVideo = flvparse._hasVideo;
	        if (this._tempBaseTime != 0 && this._tempBaseTime == flvparse.arrTag[0].getTime()) {
	          tagdemux._timestampBase = 0;
	        }
	        tagdemux.moofTag(flvparse.arrTag);
	        this.setflvBase = this.setflvBaseUsually;
	      }
	      return offset;
	    }

	    /**
	     * ??????????????????????????????!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	     * ????????????????????????
	     * @param {any} arraybuff
	     * @param {any} baseTime
	     * @returns
	     *
	     * @memberof flv2fmp4
	     */
	  }, {
	    key: "setflvBaseUsually",
	    value: function setflvBaseUsually(arraybuff, baseTime) {
	      var offset = flvparse.setFlv(new Uint8Array(arraybuff));
	      if (flvparse.arrTag.length > 0) {
	        tagdemux.moofTag(flvparse.arrTag);
	      }
	      return offset;
	    }

	    /**
	     * ??????????????????????????????!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	     * moof??????
	     *
	     * @param {any} track
	     * @param {any} value
	     *
	     * @memberof flv2fmp4
	     */
	  }, {
	    key: "onMdiaSegment",
	    value: function onMdiaSegment(track, value) {
	      if (this.onMediaSegment) {
	        this.onMediaSegment(new Uint8Array(value.data));
	      }
	      if (this._pendingResolveSeekPoint != -1 && track == 'video') {
	        var seekpoint = this._pendingResolveSeekPoint;
	        this._pendingResolveSeekPoint = -1;
	        if (this.seekCallBack) {
	          this.seekCallBack(seekpoint);
	        }
	      }
	    }

	    /**
	     *
	     * ???????????????????????????tag
	     *
	     * @param {any} type
	     * @param {any} meta
	     *
	     * @memberof flv2fmp4
	     */
	  }, {
	    key: "Metadata",
	    value: function Metadata(type, meta) {
	      switch (type) {
	        case 'video':
	          this.metas.push(meta);
	          this.m4mof._videoMeta = meta;
	          if (this.hasVideo && !this.hasAudio) {
	            this.metaSucc();
	            return;
	          }
	          break;
	        case 'audio':
	          this.metas.push(meta);
	          this.m4mof._audioMeta = meta;
	          if (!this.hasVideo && this.hasAudio) {
	            this.metaSucc();
	            return;
	          }
	          break;
	      }
	      if (this.hasVideo && this.hasAudio && this.metaSuccRun && this.metas.length > 1) {
	        this.metaSucc();
	      }
	    }

	    /**
	     * metadata???????????????????????????????????????tag??????????????????tag
	     *
	     * @param {any} mi
	     * @returns
	     *
	     * @memberof flv2fmp4
	     */
	  }, {
	    key: "metaSucc",
	    value: function metaSucc(mi) {
	      if (this.onMediaInfo) {
	        this.onMediaInfo(mi, {
	          hasAudio: this.hasAudio,
	          hasVideo: this.hasVideo
	        });
	      }
	      // ??????ftyp???moov
	      if (this.metas.length == 0) {
	        this.metaSuccRun = true;
	        return;
	      }
	      this.ftyp_moov = MP4.generateInitSegment(this.metas);
	      if (this.onInitSegment && this.loadmetadata == false) {
	        this.onInitSegment(this.ftyp_moov);
	        this.loadmetadata = true;
	      }
	    }
	  }, {
	    key: "onDataAvailable",
	    value: function onDataAvailable(audiotrack, videotrack) {
	      this.m4mof.remux(audiotrack, videotrack);
	    }

	    /**
	     * ??????flv??????????????????
	     * ????????????
	     * @param {any} arraybuff
	     * @param {any} baseTime flv??????????????????
	     * @returns
	     *
	     * @memberof flv2fmp4
	     */
	  }, {
	    key: "setflv",
	    value: function setflv(arraybuff, baseTime) {
	      return this.setflvBase(arraybuff, baseTime);
	    }

	    /**
	     *
	     * ??????????????????,????????????
	     * @param {any} arraybuff
	     * @returns
	     *
	     * @memberof flv2fmp4
	     */
	  }, {
	    key: "setflvloc",
	    value: function setflvloc(arraybuff) {
	      flvparse.setFlv(new Uint8Array(arraybuff));
	      if (flvparse.arrTag.length > 0) {
	        return flvparse.arrTag;
	      }
	    }
	  }]);
	  return flv2fmp4;
	}();
	/**
	 * ??????????????????,??????????????????????????????,???????????????????????????
	 *
	 * @class foreign
	 */
	var foreign = /*#__PURE__*/function () {
	  function foreign(config) {
	    _classCallCheck(this, foreign);
	    this.f2m = new flv2fmp4(config);
	    // ??????????????????
	    this._onInitSegment = null;
	    this._onMediaSegment = null;
	    this._onMediaInfo = null;
	    this._seekCallBack = null;
	  }

	  /**
	   *
	   * ??????
	   * @param {any} basetime  ????????????
	   *
	   * @memberof foreign
	   */
	  _createClass(foreign, [{
	    key: "seek",
	    value: function seek(basetime) {
	      this.f2m.seek(basetime);
	    }

	    /**
	     * ??????flv??????????????????
	     * ????????????
	     * @param {any} arraybuff
	     * @returns
	     *
	     * @memberof flv2fmp4
	     */
	  }, {
	    key: "setflv",
	    value: function setflv(arraybuff) {
	      return this.f2m.setflv(arraybuff, 0);
	    }

	    /**
	     *
	     * ??????????????????,????????????
	     * @param {any} arraybuff
	     * @returns
	     *
	     * @memberof flv2fmp4
	     */
	  }, {
	    key: "setflvloc",
	    value: function setflvloc(arraybuff) {
	      return this.f2m.setflvloc(arraybuff);
	    }

	    /**
	     * ???????????????seg????????????
	     *
	     *
	     * @memberof foreign
	     */
	  }, {
	    key: "onInitSegment",
	    set: function set(fun) {
	      this._onInitSegment = fun;
	      this.f2m.onInitSegment = fun;
	    }

	    /**
	     * ??????moof????????????
	     *
	     *
	     * @memberof foreign
	     */
	  }, {
	    key: "onMediaSegment",
	    set: function set(fun) {
	      this._onMediaSegment = fun;
	      this.f2m.onMediaSegment = fun;
	    }

	    /**
	     * ??????metadata????????????
	     *
	     *
	     * @memberof foreign
	     */
	  }, {
	    key: "onMediaInfo",
	    set: function set(fun) {
	      this._onMediaInfo = fun;
	      this.f2m.onMediaInfo = fun;
	    }

	    /**
	     * ????????????????????????????????????
	     *
	     *
	     * @memberof foreign
	     */
	  }, {
	    key: "seekCallBack",
	    set: function set(fun) {
	      this._seekCallBack = fun;
	      this.f2m.seekCallBack = fun;
	    }
	  }]);
	  return foreign;
	}();

	// WEBPACK FOOTER //
	// ./js/flv2fmp4.js

	/* eslint-disable */
	var temp = new foreign();
	window.flvParse = {
	  mp4File: null,
	  succ: null,
	  tracks: [],
	  baseTime: 0,
	  setFlv: function setFlv(uint8, baseTime) {
	    if (flvParse.baseTime != baseTime) {
	      flvParse.baseTime = baseTime;
	      temp.seek(baseTime);
	    }
	    if (window.mp4Init) {
	      temp.onInitSegment = window.mp4Init;
	    }
	    if (window.onMediaSegment) {
	      temp.onMediaSegment = window.onMediaSegment;
	    }
	    if (window.seekCallBack) {
	      // temp.seekCallBack = window.se
	      temp.seekCallBack = window.seekCallBack;
	    }
	    if (window.onMediaInfo) {
	      temp.onMediaInfo = window.onMediaInfo;
	    }
	    return temp.setflv(uint8.buffer, baseTime);

	    // ????????????moov
	  },
	  setLocFlv: function setLocFlv(uin8) {
	    return temp.setflvloc(uin8);
	  }
	};

}));
//# sourceMappingURL=flv-demux.dev.js.map
