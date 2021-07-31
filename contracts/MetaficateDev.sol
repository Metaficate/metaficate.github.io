// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Base64.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract Metaficate is ERC721, ChainlinkClient {

    uint256 tokenCount = 0;

    // border, textbg, logo1, 2, 3
    string[5][64] colors = [
      ["#6f4cff", "#FFF59D ", "#CE93D8", "#B2DFDB", "#FFCC80"],
      ["#6f4cff", "#FFF59D ", "#CE93D8", "#FFCC80","#B2DFDB"],
      ["#6f4cff", "#FFF59D ", "#B2DFDB", "#CE93D8","#FFCC80"],
      ["#6f4cff", "#FFF59D ", "#B2DFDB", "#FFCC80","#CE93D8"],
      ["#6f4cff", "#FFF59D ", "#FFCC80", "#B2DFDB", "#CE93D8"],
      ["#6f4cff", "#FFF59D ", "#FFCC80", "#CE93D8", "#B2DFDB"],
      ["#F28D8D", "#F2B9AC", "#DED0F2", "#91AAF2", "#6B98F2"],
      ["#F28D8D", "#F2B9AC", "#DED0F2", "#6B98F2", "#91AAF2"],
      ["#F28D8D", "#F2B9AC", "#91AAF2", "#DED0F2", "#6B98F2"],
      ["#F28D8D", "#F2B9AC", "#91AAF2", "#6B98F2", "#DED0F2"],
      ["#F28D8D", "#F2B9AC", "#6B98F2", "#91AAF2", "#DED0F2"],
      ["#F28D8D", "#F2B9AC", "#6B98F2", "# DED0F2", "#91AAF2"],
      ["#408B80", "#FFC9B3", "#B28572", "#9FE0F6", "#BA68C8"],
      ["#408B80", "#FFC9B3", "#B28572", "#BA68C8", " #9FE0F6"],
      ["#408B80", "#FFC9B3", "#9FE0F6", "#B28572", "#BA68C8"],
      ["#408B80", "#FFC9B3", "#9FE0F6", "#BA68C8", " #B28572"],
      ["#408B80", "#FFC9B3", "#BA68C8 ", "#9FE0F6", "#B28572"],
      ["#408B80", "#FFC9B3", "#BA68C8 ", "#B28572", " #9FE0F6"],
      ["#1E88E5", "#F2D785", "#BF8091", "#6D9BA6", "#F2BDC7"],
      ["#1E88E5", "#F2D785", "#BF8091", "#F2BDC7", "#6D9BA6"],
      ["#1E88E5", "#F2D785", "#6D9BA6 ", "#BF8091", "#F2BDC7"],
      ["#1E88E5", "#F2D785", "#6D9BA6 ", "#F2BDC7", " #BF8091"],
      ["#1E88E5", "#F2D785", "#F2BDC7 ", "#6D9BA6", "#BF8091"],
      ["#1E88E5", "#F2D785", "#F2BDC7 ", "#BF8091", "#6D9BA6"],
      ["#FBC02D", "#C375CD", "#4CAF50", "#F0627D", "#42A5F5"],
      ["#FBC02D", "#C375CD", "#4CAF50", "#42A5F5", "#F0627D"],
      ["#FBC02D", "#C375CD", "#F0627D", "#4CAF50", "#42A5F5"],
      ["#FBC02D", "#C375CD", "#F0627D", "#42A5F5", "#4CAF50"],
      ["#FBC02D", "#C375CD", "#42A5F5", "#F0627D", "#4CAF50"],
      ["#FBC02D", "#C375CD", "#42A5F5", "#4CAF50 ", "#F0627D"],
      ["#55D99B", "#F2C46D", "#3A3659", "#C4F2EE", "#667BF2"],
      ["#55D99B", "#F2C46D", "#3A3659", "#667BF2", "#C4F2EE"],
      ["#55D99B", "#F2C46D", "#C4F2EE", "#3A3659", "#667BF2"],
      ["#55D99B", "#F2C46D", "#C4F2EE", "#667BF2", "#3A3659"],
      ["#55D99B", "#F2C46D", "#667BF2", "#C4F2EE", "#3A3659"],
      ["#55D99B", "#F2C46D", "#667BF2", "#3A3659", "#C4F2EE"],
      ["#BF36A8", "#D95585", "#402CBF", "#341940", "#3054BF"],
      ["#BF36A8", "#D95585", "#402CBF", "#3054BF", "#341940"],
      ["#BF36A8", "#D95585", "#3054BF", "#341940", "#402CBF"],
      ["#BF36A8", "#D95585", "#3054BF", "#402CBF", "#341940"],
      ["#BF36A8", "#D95585", "#341940", "#402CBF", "#3054BF"],
      ["#BF36A8", "#D95585", "#341940", "#3054BF", "#402CBF"],
      ["#38BDF2", "#F2AE72", "#6D2BD4", "#D97941", "#0DB9CC"],
      ["#38BDF2", "#F2AE72", "#6D2BD4", "#0DB9CC", "#D97941"],
      ["#38BDF2", "#F2AE72", "#0DB9CC", "#D97941", "#6D2BD4"],
      ["#38BDF2", "#F2AE72", "#0DB9CC", "#6D2BD4", "#D97941"],
      ["#38BDF2", "#F2AE72", "#0DB9CC", "#D97941", "#6D2BD4"],
      ["#38BDF2", "#F2AE72", "#0DB9CC", "#6D2BD4", "#D97941"],
      ["#F26B1D", "#8D5EF2", "#F277C7", "#5B44F2", "#F2E852"],
      ["#F26B1D", "#8D5EF2", "#F277C7", "#F2E852", "#5B44F2"],
      ["#F26B1D", "#8D5EF2", "#5B44F2", "#F277C7", "#F2E852"],
      ["#F26B1D", "#8D5EF2", "#5B44F2", "#F2E852", "#F277C7"],
      ["#F26B1D", "#8D5EF2", "#F2E852 ", "#5B44F2", "#F277C7"],
      ["#F26B1D", "#8D5EF2", "#F2E852 ", "# F277C7", "#5B44F2"],
      ["#64588C", "#AEE6F2", "#A496D9", "#735645", "#F2A7A7"],
      ["#64588C", "#AEE6F2", "#A496D9", "#735645", "#F2A7A7"],
      ["#64588C", "#AEE6F2", "#F2A7A7 ", "#735645", "#A496D9"],
      ["#64588C", "#AEE6F2", "#F2A7A7 ", "#A496D9", "#735645"],
      ["#64588C", "#AEE6F2", "#F2A7A7", "#735645", "#A496D9"],
      ["#64588C", "#AEE6F2", "#F2A7A7", "#A496D9", "#735645"],
      ["#732937", "#F2E2CE", "#BF9D8A", "#9D3E60", "#BC6868"],
      ["#732937", "#F2E2CE", "#BF9D8A", "#BC6868", "#9D3E60"],
      ["#732937", "#F2E2CE", "#9D3E60", "#BF9D8A", "#BC6868"],
      ["#732937", "#F2E2CE", "#9D3E60", "#BC6868", "#BF9D8A"]
    ];

    string[3] icons = [
        '<g transform="matrix(.11 0 0 .11 16.5 16.5)"><path fill="#fff" d="M196.8 54.8s1.1-.4 2.2-.6c10.2-1.8 32.4 15.2 33.6 16.1 16.3 12.7 24.4 19 27.1 22.4 6.3 7.8 9.7 15.1 20.7 26.9 5.9 6.4 9.3 9.9 11 9 4.6-2.4-12.5-30.7-10-67 1.4-19.9 8.6-42.2 15.7-42.2 6.7 0 11.9 20.1 13.9 27.9 12.7 49.5-8.1 68.8 6 107.1 10.7 29.2 14.8 36.6 14.8 36.6 2.3 4.1 7.7 13.8 9.9 27.3 1.1 6.6.7 10.3-.3 13.7-.2.5-4 12.2-13.9 15.2-8.7 2.7-16.3-3.2-19.3.6-1.8 2.3.1 5.5-2.4 8.1-2 2-3.9.7-6 2.2-4.5 3.1-.1 12.2-3.6 22.4-.7 2.1-2.7 4.8-6.6 10.2-12.5 17.1-19.5 21.6-18.1 27.6.6 2.4 2.6 5.5 1.5 9.6 0 0-.4 1.4-1.2 2.8-4.5 7.5-26.4 16.6-29.3 17.8-16.9 7.1-19.4 9.5-23.7 7.6-4.9-2.1-4.7-6.5-12.7-10.6-3.4-1.7-4.9-1.7-9.9-4.3-5.9-3.1-5.6-4.1-8.1-5-6.2-2.1-9.2 3.2-22.3 7.5-9.1 2.9-13.6 2.3-15.1 5.9-1.6 3.8 1.6 9.4-.3 10.6-1 .6-2.2-.5-3.3.3-1.2.9-.3 2.8-1.2 4-1.6 2.2-7.5.4-7.8.3-11.8-3.7-24.6-2.3-36.8-4.7-30.8-6-48.4-1.3-51.5-9.9-1.1-3.1.8-4.4-.6-9-1.8-5.7-5.8-7.3-14.2-14.3-9-7.4-13.6-11.4-15.3-17.7-1.4-5-.3-9 .6-13.1 4.6-20.9.2-20.1 4.8-42.8 2.2-10.8 5.1-19.1 10.9-35.7 6.8-19.6 10.2-29.4 14.2-33.8 4.9-5.5 9-7 47-17.4 33.7-9.2 39.1-10.4 48.5-9.9 8.5.5 15.6 2.1 29.5 5.3 20.9 4.8 21.4 7.1 33.8 8.4 15 1.5 32.2 0 32.3 0 0 0 11.2-13.2 9.9-23.9-.7-5.9-5-9.6-11.2-14.9-18.1-15.6-34.2-30.1-45.8-46.3-5.3-7.4-8.8-13.9-6.9-19.9.9-3 4.1-8.4 9.5-10.4z" /><ellipse fill="#fff" cx="319" cy="394.2" rx="152.7" ry="86.5" /></g>',
        '<path fill="#fff" d="M42.95 37.05c3.5 0 6.6 1.5 8.9 3.85 2.3 2.4 3.7 5.7 3.7 9.3 0 .95-.1 1.9-.3 2.85h15.8c1.05 0 1.3.6 1.3 1.3s-.25 1.3-1.3 1.3h-55c-1.05 0-1.3-.6-1.3-1.3s.25-1.3 1.3-1.3h14.6c-.2-.9-.3-1.85-.3-2.85 0-3.65 1.4-6.95 3.7-9.3 2.3-2.35 5.45-3.85 8.9-3.85zM44.2 62.7c-1.05 0-1.3-.6-1.3-1.3s.25-1.3 1.3-1.3h28.45c1.05 0 1.3.6 1.3 1.3s-.25 1.3-1.3 1.3H44.2zm-30.4 0c-1.05 0-1.3-.6-1.3-1.3s.25-1.3 1.3-1.3h14.75c1.05 0 1.3.6 1.3 1.3s-.25 1.3-1.3 1.3H13.8zm17.9-30.45c-.4-.7-.15-1.55.5-1.9s1.55-.15 1.9.5L35.9 34c.4.7.15 1.55-.5 1.95s-1.55.15-1.9-.5l-1.8-3.2zm10.15-3.35c0-.8.65-1.4 1.4-1.4s1.4.65 1.4 1.4v3.6c0 .8-.65 1.4-1.4 1.4s-1.4-.65-1.4-1.4v-3.6zm10.45 2.2c.4-.65 1.25-.9 1.9-.5s.9 1.25.5 1.9l-1.8 3.15c-.4.7-1.25.9-1.9.5-.65-.4-.9-1.25-.5-1.9l1.8-3.15zm7.9 7.15c.65-.4 1.55-.15 1.9.5s.15 1.55-.5 1.95l-3.1 1.8c-.65.4-1.55.15-1.9-.5s-.15-1.55.5-1.95l3.1-1.8zm3.35 10.15c.8 0 1.4.65 1.4 1.4 0 .8-.65 1.4-1.4 1.4h-3.6c-.8 0-1.4-.65-1.4-1.4s.65-1.4 1.4-1.4h3.6zm-41.2 2.25c-.8 0-1.4-.65-1.4-1.4s.65-1.4 1.4-1.4H26c.8 0 1.4.65 1.4 1.4s-.65 1.4-1.4 1.4h-3.65zm2.2-10.45c-.7-.4-.9-1.25-.5-1.9.4-.7 1.25-.9 1.9-.5l3.15 1.8c.65.4.9 1.25.5 1.9s-1.25.9-1.9.5l-3.15-1.8z" />',
        '<path fill="#fff" d="M21.44 63.52c1.6 1.72 5.04.92 9.28-1.44-3.88-2.6-6.88-6.4-8.56-10.84-2.48 5.12-3.16 9.64-.72 12.28zm40.4-33.36c1.96-3.84 2.56-6.96 1.08-8.6-2.28-2.52-6.56-1.92-11.6.52 4.24 1.6 7.92 4.44 10.52 8.08zM43.4 20.68c1.6 0 3.12.16 4.64.48 6.88-3.88 13.16-5 16.64-1.2 2.24 2.44 1.48 6.8-1.16 11.92v.04l-.24.48.04.04c-5.64 12.44-16.56 23-29.32 30.52l-.84.52c-5.8 3.4-10.76 4.52-13.4 1.68-3.52-3.84-2.28-10.24 1.56-17.12-.32-1.52-.48-3.08-.48-4.68-.08-12.56 10.04-22.68 22.56-22.68zm21.64 15.96c.64 2.12 1 4.36 1 6.68 0 12.52-10.12 22.64-22.64 22.64-2.36 0-4.6-.36-6.72-1 12.6-7.52 22.16-16.88 28.36-28.32z" />'
    ];

    uint8[3][8] orders = [
      [0,1,2],
      [0,2,1],
      [1,0,2],
      [1,2,0],
      [2,0,1],
      [2,1,0],
      [0,1,2],
      [1,0,2]
    ];

    string[8] texts = [
      "Curators are critical to the Graph decentralized economy.",
      "Creating a subgraph is permissionless.",
      "Remember that curation is risky.",
      "A subgraph can fail due to a bug.",
      "Curators are economically incentivized to signal early.",
      "Curators make The Graph network efficient.",
      "In return, curators earn query fees.",
      "Curators make The Graph network efficient."
    ];

    // tokenId => Meta
    mapping(uint256 => Meta) public metas;

    struct Meta {
      address addr;
      uint256 key;
      uint256 times;
      uint256 createdAt;
    }

    using Chainlink for Chainlink.Request;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    uint256 public combinedInfo;

    constructor() ERC721('Metaficate', 'MFT') {
        // Kovan Testnet
        setChainlinkToken(0xa36085F69e2889c224210F603D836748e7dC0088);
        oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 10 ** 17; // 0.1 LINK
    }

    function requestCuratorInfo() public returns (bytes32 requestId) 
    {
        
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        string memory add = addressToString(msg.sender);
        string memory url = string(abi.encodePacked("https://knowyourdefifunc.azurewebsites.net/api/GetCuratorInfoFunc?address=", add));
        
        request.add("get", url);
        
        string[] memory path = new string[](1);
        path[0] = "combinedInfo";
        request.addStringArray("path", path);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    function fulfill(bytes32 _requestId, uint256 _combinedInfo) public recordChainlinkFulfillment(_requestId)
    {
        combinedInfo = _combinedInfo;
    }

    function mint() public returns (uint256 tokenId) {
        tokenId = tokenCount;
        tokenCount = tokenCount + 1;
        Meta memory meta;
        meta.addr = msg.sender;
        meta.key = uint(keccak256(abi.encodePacked(tokenId, block.timestamp, msg.sender)));
        meta.times = this.GetTimes();
        meta.createdAt = this.GetCreatedAt();
        metas[tokenId] = meta;
        super._mint(msg.sender, tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory name = 'The Graph Curator Metafication';
        string memory desc = 'Curators use their knowledge of the web3 ecosystem to assess and signal on the subgraphs that should be indexed by The Graph Network. Metaficate is an on-chain generative art and decentralized certificate created for the metaverse and the web 3 world.';
        string memory image = Base64.encode(bytes(createImage(tokenId)));

        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"',
                            name,
                            '", "description":"',
                            desc,
                            '", "image": "',
                            'data:image/svg+xml;base64,',
                            image,
                            '"}'
                        )
                    )
                )
            )
        );
    }

    function createIcon(uint8 color_index, uint8 order_index) public view returns (string memory) {
        string memory color_icon1 = colors[color_index][2];
        string memory color_icon2 = colors[color_index][3];
        string memory color_icon3 = colors[color_index][4];

        string memory icon1 = icons[orders[order_index][0]];
        string memory icon2 = icons[orders[order_index][1]];
        string memory icon3 = icons[orders[order_index][2]];
        return string(
          abi.encodePacked(
            '<g transform="translate(79,448)">',
            '<rect width="88" height="88" rx="16" fill="', color_icon1, '" />',
            icon1,
            '</g>',
            '<g transform="translate(216,448)">',
            '<rect width="88" height="88" rx="16" fill="', color_icon2, '" />',
            icon2,
            '</g>',
            '<g transform="translate(353,448)">',
            '<rect width="88" height="88" rx="16" fill="', color_icon3, '" />',
            icon3,
            '</g>'
          )
        );
    }

    function createImage(uint256 tokenId) public view returns (string memory) {
        string memory addr = addressToString(metas[tokenId].addr);
        string memory id = Strings.toString(tokenId);

        string memory count = '2501';
        string memory times = Strings.toString(metas[tokenId].times);
        string memory start = Strings.toString(metas[tokenId].createdAt);

        bytes memory key = abi.encodePacked(bytes32(metas[tokenId].key));
        uint8 color_index = toUint8(key, 1) / 4; // 64
        uint8 text_index = toUint8(key, 0) / 32; // 8
        uint8 order_index = toUint8(key, 2) / 32; // 8

        string memory text = texts[text_index];
        string memory color_border = colors[color_index][0];
        string memory color_textbg = colors[color_index][1];

        string memory icon = createIcon(color_index, order_index);

        return string(
            abi.encodePacked(
              '<svg xmlns="http://www.w3.org/2000/svg" width="520" height="600" font-family="Arial">',
              '<rect width="520" height="600" rx="26" fill="', color_border, '" />',
              '<rect x="30" y="40" width="460" height="520" rx="26" fill="#fff" />',
              '<path fill="', color_textbg, '" d="M30 310h460v110H30z" />',
              '<text x="30" y="28" font-size="17">', addr, '</text>',
              '<text x="42" y="96" font-size="31">The Graph Curator</text>',
              '<text x="42" y="146" font-size="29">ID: ', id, '</text>',
              '<text x="305" y="146" font-size="29" text-anchor="end">1/', count, '</text>',
              '<text x="42" y="192" font-size="29">TIMES: ', times, '</text>',
              '<text x="42" y="242" font-size="29">STARTED ON: ', start, '</text>',
              '<text x="42" y="296" font-size="29">SNAPSHOTTED ON: 2021.7.30</text>',
              '<text text-anchor="middle" x="250" y="369" font-size="15">', text, '</text>',

              // grt logo
              '<g transform="translate(348,60)">',
              '<circle cx="48" cy="48" r="48" fill="#6747ed" />',
              '<g transform="translate(-88 -52)">',
              '<path fill-rule="evenodd" clip-rule="evenodd" fill="#fff" d="M135.3 106.2c-7.1 0-12.8-5.7-12.8-12.8 0-7.1 5.7-12.8 12.8-12.8 7.1 0 12.8 5.7 12.8 12.8 0 7.1-5.7 12.8-12.8 12.8m0-32c10.6 0 19.2 8.6 19.2 19.2s-8.6 19.2-19.2 19.2-19.2-8.6-19.2-19.2 8.6-19.2 19.2-19.2zm18.3 39.4c1.3 1.3 1.3 3.3 0 4.5l-12.8 12.8c-1.3 1.3-3.3 1.3-4.5 0-1.3-1.3-1.3-3.3 0-4.5l12.8-12.8c1.2-1.3 3.3-1.3 4.5 0zm7.4-36.2c0 1.8-1.4 3.2-3.2 3.2-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2c1.7 0 3.2 1.4 3.2 3.2z"/>',
              '</g>',
              '</g>',

              icon,
              '</svg>'
            )
        );
    }

    // https://github.com/GNSPS/solidity-bytes-utils/blob/master/contracts/BytesLib.sol
    function toUint8(bytes memory _bytes, uint256 _start) internal pure returns (uint8) {
        require(_start + 1 >= _start, "toUint8_overflow");
        require(_bytes.length >= _start + 1 , "toUint8_outOfBounds");
        uint8 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x1), _start))
        }
        return tempUint;
    }

    function addressToString(address _addr) public pure returns(string memory) {
        return Strings.toHexString(uint160(_addr), 20);
    }

    function GetTimes() view public returns (uint256)
	{
		uint256 answer = combinedInfo / 1e10 ;
		return answer;
	}
	
	function GetCreatedAt() view public returns (uint256)
	{
		uint256 answer = combinedInfo % 1e10 ;
		return answer;
	}
}
