pragma solidity ^0.4.17;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract IncroSpon is Ownable{ 
    //string public name = 'Incro-Sponsor';

    Campaign[] public campaigns;
    Sponsor[] public sponsors;
    Participant[] public participants;
    EventPayLog[] public eventpaylogs;

    struct Campaign {
        uint256 camp_id;        // 1
        string name;            // 2  -- w
        address started_by;     // 3  -- w
        uint256 end_date;       // 4  -- w
        int32 unit_goal;        // 5  
        int32 unit_so_far;      // 6  
        uint256 wei_paid_out;   // 7  
        uint256 wei_in_escrow;  // 8  
    }

    struct Sponsor {
        uint256 camp_id;        // 1
        address addr_spon;      // 2
        address addr_part;      // 3
        address addr_pay_to;    // 4
        int8 unit;              // 5
        uint256 wei_per_unit;   // 6
        uint256 wei_in_escrow;  // 7
    }

    struct Participant {
        uint256 camp_id;        // 1
        address addr_part;      // 2
        string name_part;       // 3
        int8 unit;              // 4
        int32 unit_goal;        // 5
        uint256 date_start;     // 6
        uint256 date_end;       // 7
    }

    struct EventPayLog {
        uint256 camp_id;        // 1
        address addr_part;      // 2
        address addr_spon;      // 3
        uint256 date_event;     // 4
        int8 unit;              // 5
        int32 qty_unit;         // 6
        uint256 wei_paid;       // 7
    }


    function getCampaignsLen() view external returns(uint256){
        return campaigns.length;
    }


    function getCampaign_rec( uint256 _camp_id ) public view returns( string, address, uint256, int32, int32, uint256, uint256 ) {
        require(_camp_id <= campaigns.length);
        Campaign memory cr = campaigns[_camp_id];
        return ( cr.name, cr.started_by, cr.end_date, cr.unit_goal, cr.unit_so_far, cr.wei_paid_out, cr.wei_in_escrow );
    }



    // function setCampaign_rec( string _mfg, string _sn) external returns(uint256 _recNum){
        //having problems with require ... getting rpc error
        // require( msg.sender == storeOwner );
        // require( (bytes(_mfg).length<=50) && (bytes(_sn).length<=50) );
        // uint256 recNum = nextRecNum++;
        //next line returns a pointer to the location to write to
        //it should automatically generate a new address based on the mapping

        //try now with constructor
        // bikeRecAll[recNum] = bikeRec( msg.sender, _mfg, _sn );
        // return recNum;
    // }   


    function getSponsorsLen() view external returns(uint256){
        return sponsors.length;
    }


    //this function will return how many sponsors for a campaign
    function getNumSponsorsForCampaign( uint256 _camp_id ) public view returns( uint256 )  {
        require(_camp_id <= campaigns.length);
        uint256 numMatches = 0;
        for(uint256 i = 0; i<=sponsors.length; i++)
        {
            if (sponsors[i].camp_id == _camp_id )  numMatches++;
        }  
        return numMatches;        
    }


    function getSponsorInCampaign_rec( uint256 _camp_id, uint256 _matchNum ) 
    public view returns( address, address, address, int8, uint256, uint256 ) {
        //this will return a matching record for a sponsor, which is the _matchNum
        // can find out the number of matching items by running the getNum function
        require(_camp_id <= campaigns.length);
        uint256 numMatches = 0;
        Sponsor memory sr;
        //maybe make this a while loop so that can exit if no match
        for(uint256 i = 0; i <= sponsors.length; i++)
        {
            if (sponsors[i].camp_id == _camp_id )  {
                numMatches++;
                if (numMatches == _matchNum) {
                    sr = sponsors[_camp_id];
                    break;
                }
            }
        }    
        return ( sr.addr_spon, sr.addr_part, sr.addr_pay_to, sr.unit, sr.wei_per_unit, sr.wei_in_escrow );
    }
    

    function getParticipantsLen() view external returns(uint256){
        return participants.length;
    }


    function getNumParticipantForCampaign( uint256 _camp_id ) public view returns( uint256 )  {
        //this function will return how many participants for a campaign
        require(_camp_id <= campaigns.length);
        uint256 numMatches = 0;
        for(uint256 i = 0; i<=participants.length; i++)
        {
            if (participants[i].camp_id == _camp_id )  numMatches++;
        }  
        return numMatches;        
    }


    function getParticipantInCampaign_rec( uint256 _camp_id, uint256 _matchNum ) 
    public view returns(  address, string, int8, int32, uint256, uint256 ) {
        //this will return a matching record for a participant, which is the _matchNum
        // can find out the number of matching items by running the getNum function
        require(_camp_id <= campaigns.length);
        uint256 numMatches = 0;
        Participant memory pr;
        for(uint256 i = 0; i <= participants.length; i++)
        {
            if (participants[i].camp_id == _camp_id )  {
                numMatches++;
                if (numMatches == _matchNum) {
                    pr = participants[_camp_id];
                    break;
                }
            }
        }    
        return ( pr.addr_part, pr.name_part, pr.unit, pr.unit_goal, pr.date_start, pr.date_end );
    }


    //the next two functions are needed when a participant is starting a 
    function getNumCampaignForParticipant( address _addr_part ) 
    public view returns( uint256 ) {
        //for a given the participant who has called this, find out
        //how many campaigns he is in
        uint256 numMatches = 0;
        for(uint256 i = 0; i<=participants.length; i++)
        {
            if (participants[i].addr_part == _addr_part )  numMatches++;
        }  
        return ( numMatches );
    }


    function getParticipantForParticipant_rec( address _addr_part, uint256 _matchNum ) 
    public view returns(  address, string, int8, int32, uint256, uint256 ) {
        //this will return a matching record for a matching part addr, which is the _matchNum
        // can find out the number of matching items by running the getNum function
        uint256 numMatches = 0;
        Participant memory pr;
        for(uint256 i = 0; i <= participants.length; i++)
        {
            if (participants[i].addr_part == _addr_part )  {
                numMatches++;
                if (numMatches == _matchNum) {
                    pr = participants[i];
                    break;
                }
            }
        }    
        return ( pr.addr_part, pr.name_part, pr.unit, pr.unit_goal, pr.date_start, pr.date_end );
    }  //get particpant record that matches the participant


    function getEventPayLogsLen() view external returns(uint256){
        return eventpaylogs.length;
    }


    function getNumEventPayLogsForCampaign( uint256 _campID ) public view returns( uint256 )  {
        //get number of matching event records for a campaign
        require(_campID <= campaigns.length);
        uint256 numMatches = 0;
        for(uint256 i = 0; i <= eventpaylogs.length; i++)
        {
            if ( eventpaylogs[i].camp_id == _campID )  numMatches++;
        }  
        return numMatches;        
    }


    function getEventPayLogsInCampaign_rec( uint256 _camp_id, uint256 _matchNum ) 
    public view returns( address, address, uint256, int8, int32, uint256 ) {
        //this will return a matching record for a participant, which is the _matchNum
        // can find out the number of matching items by running the getNum function
        require(_camp_id <= campaigns.length);
        uint256 numMatches = 0;
        EventPayLog memory er;
        for(uint256 i = 0; i <= participants.length; i++)
        {
            if (eventpaylogs[i].camp_id == _camp_id )  {
                numMatches++;
                if (numMatches == _matchNum) {
                    er = eventpaylogs[_camp_id];
                    break;
                }
            }
        }    
        return ( er.addr_part, er.addr_spon, er.date_event, er.unit, er.qty_unit, er.wei_paid );
    }


    //functions to write to the contract
    function setCampaign_rec(string _name, address _started_by, uint256 _end_date) external returns (uint256) {
        uint256 _camp_id = campaigns.length;
        int32 _unit_goal = 0;
        int32 _unit_so_far = 0;     
        uint256 _wei_paid_out = 0; 
        uint256 _wei_in_escrow = 0;
        campaigns.push(Campaign(_camp_id, _name, _started_by, _end_date, _unit_goal, _unit_so_far, _wei_paid_out, _wei_in_escrow));
    }
}


